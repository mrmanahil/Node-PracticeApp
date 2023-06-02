const express = require("express");
const auth = require("../middleware/auth");
const bodyParser = require("body-parser");
const { upload } = require("../libs/multer.lib");
const router = express.Router();

const {
  handleRegister,
  handleLogin,
  handleProfileUpdate,
} = require("../components/users/user.controller");

router.post("/register", bodyParser.json(), handleRegister);
router.post("/signin", bodyParser.json(), handleLogin);
router.put(
  "/profile/me",
  upload.single("profile_picture"),
  bodyParser.json(),
  auth,
  handleProfileUpdate
);

module.exports = router;
