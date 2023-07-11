const { checkRequiredFields } = require("../../utils/validation");
const { User } = require("../users/user");
const { Videos } = require("../videos/videos");
const { Comment } = require("./comments");

const createCommentsOnVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const { comment } = req.body;
    const { user_id } = req.user;
    checkRequiredFields({ comment }, res);
    const user = await User.findById(user_id);
    const video = await Videos.findById({ _id: videoId });
    if (!video)
      res.status(404).send({
        message: "No Video Found",
        success: false,
      });
    const newComment = new Comment({
      user,
      comment,
      video,
    });
    const savedComment = await newComment.save();
    video.comments.push(savedComment._id);
    await video.save();
    res.status(200).send({
      message: "Comment Added",
      success: true,
      data: { comment: savedComment },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      messgae: "Internal Error",
      success: false,
    });
  }
};

const getAllCommentsByVideoId = async (req, res) => {
  try {
    const { videoId } = req.params;
    const video = await Videos.findById(videoId)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          model: User,
        },
      })
      .exec();
    !video &&
      res.status(404).send({
        message: "No video found",
        success: false,
      });
    res.status(200).send({
      message: "Fetched Successfully",
      success: true,
      data: video.comments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      messgae: "Internal Error",
      success: false,
    });
  }
};

const deleteCommentsOnCommentId = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { user_id } = req.user;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        message: "No Comment Found",
        success: false,
      });
    }
    if (comment.user._id != user_id) {
      return res.status(403).send({
        message: "You are not authorized to delete this comment",
        success: false,
      });
    }
    await Videos.findOneAndUpdate(
      { comments: commentId },
      { $pull: { comments: commentId } },
      { new: true }
    );
    const deleteComment = await Comment.findByIdAndDelete(comment._id);
    if (!deleteComment) {
      return res.status(404).send({
        message: "No Comments Found",
        success: false,
      });
    }
    res.status(200).send({
      message: "Comment deleted successfully",
      success: true,
      data: deleteComment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal Error",
      success: false,
    });
  }
};

const updateCommentsOnCommentId = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { comment } = req.body;
    const { user_id } = req.user;
    checkRequiredFields({ comment }, res);
    const singlecomment = await Comment.findById(commentId);
    if (!singlecomment) {
      return res.status(404).json({
        message: "No Comment Found",
        success: false,
      });
    }
    if (singlecomment.user._id != user_id) {
      return res.status(403).send({
        message: "You are not authorized to delete this comment",
        success: false,
      });
    }
    const commentById = await Comment.findByIdAndUpdate(
      commentId,
      {
        comment,
      },
      { new: true }
    );
    if (!commentById) {
      res.status(404).send({ message: "Comment Not Found", success: false });
    }
    res.status(200).send({
      message: "Comment Updated Successfully",
      success: true,
      data: { comment: commentById },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      messgae: "Internal Error",
      success: false,
    });
  }
};

module.exports = {
  createCommentsOnVideo,
  getAllCommentsByVideoId,
  deleteCommentsOnCommentId,
  updateCommentsOnCommentId,
};
