const express = require("express");
const router = express.Router();
const { upload } = require("../../libs/multer.lib");
const auth = require("../../middleware/auth");
const { handleUploadImages } = require("../upload");

// For Uploading images
router.post("/upload", upload.single("image"), auth, handleUploadImages);

module.exports = router;
