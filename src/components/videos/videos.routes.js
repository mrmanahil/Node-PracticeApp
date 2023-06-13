const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const {
  createVideos,
  getAllvideosByChannelId,
  uploadVideos,
  updateVideos,
  deleteVideo,
  getSingleVideo,
} = require("./videos.controller");
const { videoUpload } = require("../../libs/videosMulter.lib");

router.use(bodyParser.json());

router.post("/videos/:channelId", auth, createVideos);
router.get("/channel/videos/:id", auth, getAllvideosByChannelId);
router.post("/videos", videoUpload.single("video"), auth, uploadVideos);
router.put("/videos/:id", auth, updateVideos);
router.delete("/videos/:id", auth, deleteVideo);
router.get("/videos/:id", auth, getSingleVideo);

module.exports = router;
