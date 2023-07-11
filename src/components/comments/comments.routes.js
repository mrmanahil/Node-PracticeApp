const {
  createCommentsOnVideo,
  getAllCommentsByVideoId,
  deleteCommentsOnCommentId,
  updateCommentsOnCommentId,
} = require("./comments.controller");
const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();

router.post("/video/:videoId/comment", auth, createCommentsOnVideo);
router.get("/video/:videoId/comment", auth, getAllCommentsByVideoId);
router.delete("/video/comment/:commentId", auth, deleteCommentsOnCommentId);
router.put("/video/comment/:commentId", auth, updateCommentsOnCommentId);

module.exports = router;
