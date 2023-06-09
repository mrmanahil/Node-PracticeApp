const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const { createCourses } = require("./courses.controller");

router.use(bodyParser.json());

router.post("/videos/courses/:channelId", auth, createCourses);

module.exports = router;
