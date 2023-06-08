const express = require("express");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const { upload } = require("../libs/multer.lib");
const { videoUpload } = require("../libs/videosMulter.lib");
const router = express.Router();

const {
  handleRegister,
  handleLogin,
  handleProfileUpdate,
  getAllStudents,
  getAllTeachers,
} = require("../components/users/user.controller");

const {
  createChannel,
  getAllChannels,
} = require("../components/channel/channel.controller");

const {
  createVideos,
  uploadVideos,
} = require("../components/videos/videos.controller");
const { handleUploadImages } = require("../components/upload");

router.post("/register", bodyParser.json(), handleRegister);
router.post("/signin", bodyParser.json(), handleLogin);
router.put(
  "/profile/me",
  upload.single("profile_picture"),
  bodyParser.json(),
  auth,
  handleProfileUpdate
);
router.post("/channel", auth, bodyParser.json(), createChannel);
router.get("/channel", auth, bodyParser.json(), getAllChannels);
router.get("/students", auth, bodyParser.json(), getAllStudents);
router.get("/teachers", auth, bodyParser.json(), getAllTeachers);
router.post("/videos/:channelId", auth, bodyParser.json(), createVideos);
router.post(
  "/videos",
  videoUpload.single("video"),
  auth,
  bodyParser.json(),
  uploadVideos
);
router.post(
  "/upload",
  upload.single("image"),
  auth,
  bodyParser.json(),
  handleUploadImages
);

module.exports = router;
