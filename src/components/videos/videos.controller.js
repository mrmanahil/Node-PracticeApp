const { Videos } = require("./videos");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkRequiredFields } = require("../../utils/validation");
// const multer = require("multer");
const cloudinary = require("../../libs/cloudinary");
const { Channel } = require("../channel/channel");

const createVideos = async (req, res) => {
  try {
    const { title, description, thumbnail, subtitles, videoURL } = req.body;
    const requiredFields = {
      title,
      description,
      thumbnail,
      subtitles,
      videoURL,
    };
    const channelId = req.params.channelId;
    const response = await Channel.findById(channelId);
    if (!response) {
      res.status(200).send({
        message: "Channel Id Is Invalid",
      });
    } else {
      checkRequiredFields(requiredFields, res);
      const video = await Videos.create({
        description,
        subtitles,
        thumbnail,
        title,
        videoURL,
        channelId,
      });
      res.status(200).send({
        message: "Video Created Successfully",
        success: true,
        data: { channel: response, video },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const uploadVideos = async (req, res) => {
  try {
    const file = req.file;
    cloudinary.uploader
      .upload(file.path, { resource_type: "video" })
      .then((result) => {
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
    const videos = await Videos.find({ channelId: id });
    res.status(200).send({
      success: true,
      message: "Fetched Successfully",
      data: videos,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createVideos,
  uploadVideos,
  getAllvideosByChannelId,
};
