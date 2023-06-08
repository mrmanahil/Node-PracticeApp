const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const { handleUploadImages } = require("../upload");

router.use(bodyParser.json());

router.post("/upload", auth, handleUploadImages);

module.exports = router;
