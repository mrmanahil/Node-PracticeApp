const { Videos } = require("./videos");
const { checkRequiredFields } = require("../../utils/validation");
const cloudinary = require("../../libs/cloudinary");
const { Channel } = require("../channel/channel");
const { User } = require("../users/user");

const createVideos = async (req, res) => {
  try {
    const { title, description, thumbnail, subtitles, videoURL } = req.body;
    const channelId = req.params.channelId;
    const response = await Channel.findById(channelId);
    if (!response) return res.status(200).send({ message: "Channel Id Is Invalid" });
    checkRequiredFields({ title, description, thumbnail, subtitles, videoURL }, res);
    const video = await Videos.create({
      description,
      subtitles,
      thumbnail,
      title,
      videoURL,
      channelId,
      isLiked: false,
      likesCount: 0,
    });
    res.status(200).send({
      message: "Video Created Successfully",
      success: true,
      data: { channel: response, video },
    });
  } catch (error) {
    console.log(error);
  }
};

const likeVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Videos.findById(videoId);
    if (!video) {
      return res.status(404).send({ message: "No Video Found", success: false });
    }
    const { userId } = req.body;
    const isLiked = video.likes.includes(userId);
    if (isLiked) {
      video.likes.pull(userId);
      video.likesCount--;
    } else {
      video.likes.push(userId);
      video.likesCount++;
    }
    await video.save();
    const updatedVideo = await Videos.findById(videoId); // Retrieve the updated video from the database
    updatedVideo.isLiked = video.likes.includes(userId); // Update the isLiked flag in the updatedVideo object
    res.status(200).send({
      message: `Video ${isLiked ? "Unliked" : "Liked"} Successfully`,
      success: true,
      data: { video: updatedVideo },
    });
  } catch (error) {
    console.log(error);
  }
};

const uploadVideos = async (req, res) => {
  try {
    const file = req.file;
    cloudinary.uploader.upload(file.path, { resource_type: "video" }).then((result) => {
      res.status(200).send({
        success: false,
        message: "Uploaded",
        data: result,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllvideosByChannelId = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findById({ _id: id });
    if (!channel) {
      res.status(404).send({
        success: fals,
        message: "Channel Not Found",
      });
    }
    const videos = await Videos.find({ channelId: id });
    if (!videos) {
      res.status(404).send({
        success: fals,
        message: "Videos Not Found",
      });
    }
    const { user_id } = req.user;
    const updatedVideos = videos.map((video) => {
      const isLiked = video.likes.includes(user_id);
      return { ...video._doc, isLiked };
    });
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      data: { channel, videos: updatedVideos },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateVideos = async (req, res) => {
  try {
    const { title, description, thumbnail, subtitles, videoURL } = req.body;
    const { id } = req.params;
    const video = await Videos.findOne({ _id: id });
    const { channelId } = video;
    const channel = await Channel.findOne({ _id: channelId });
    checkRequiredFields({ title, description, thumbnail, subtitles, videoURL }, res);
    const updatedVideo = await Videos.findByIdAndUpdate(
      req.params.id,
      { title, description, thumbnail, subtitles, videoURL },
      { new: true }
    );
    const isLiked = updatedVideo.likes.includes(req.user.user_id);
    res.status(200).send({
      message: "Video Updated Successfully",
      success: true,
      data: { channel, video: { ...updatedVideo._doc, isLiked } },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Videos.findByIdAndDelete(id);
    res.status(200).send({
      message: "Video Deleted Successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Videos.findById(id);
    const channel = await Channel.findOne({ _id: video.channelId });
    !video && res.status(404).send({ message: "No Video Found", success: false });
    const { user_id } = req.user;
    const isLiked = video.likes.includes(user_id);
    video &&
      res.status(200).send({
        message: "Fetched Successfully",
        success: true,
        data: { channel, video: { ...video._doc, isLiked } },
      });
  } catch (error) {
    console.log(error);
  }
};

const allLikedVideos = async (req, res) => {
  try {
    const { user_id } = req.user;
    const likedVideos = await Videos.find({ likes: user_id }).lean();
    res.status(200).send({
      message: "Liked Videos Fetched Successfully",
      success: true,
      data: likedVideos.map((video) => ({ ...video, isLiked: true })),
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createVideos,
  uploadVideos,
  updateVideos,
  getAllvideosByChannelId,
  deleteVideo,
  getSingleVideo,
  likeVideo,
  allLikedVideos,
};
