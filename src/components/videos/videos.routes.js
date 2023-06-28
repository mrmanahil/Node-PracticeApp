const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  createVideos,
  getAllvideosByChannelId,
  uploadVideos,
  updateVideos,
  deleteVideo,
  getSingleVideo,
  likeVideo,
  allLikedVideos,
} = require("./videos.controller");
const { videoUpload } = require("../../libs/videosMulter.lib");

router.post("/videos/:channelId", auth, createVideos);
router.get("/channel/videos/:id", auth, getAllvideosByChannelId);
router.post("/videos", videoUpload.single("video"), auth, uploadVideos);
router.put("/videos/:id", auth, updateVideos);
router.delete("/videos/:id", auth, deleteVideo);
router.get("/videos/:id", auth, getSingleVideo);
router.post("/video/:videoId", auth, likeVideo);
router.get("/likedVideos", auth, allLikedVideos);

module.exports = router;
