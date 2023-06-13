const express = require("express");
const router = express.Router();
const { upload } = require("../../libs/multer.lib");
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const { handleUploadImages } = require("../upload");

router.use(bodyParser.json());

// For Uploading images
router.post("/upload", upload.single("image"), auth, handleUploadImages);

module.exports = router;
