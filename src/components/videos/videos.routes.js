const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const {
  createVideos,
  getAllvideosByChannelId,
  uploadVideos,
} = require("./videos.controller");

router.use(bodyParser.json());

router.post("/videos/:channelId", auth, createVideos);
router.get("/channel/videos/:id", auth, getAllvideosByChannelId);
router.post("/videos", auth, uploadVideos);

module.exports = router;
