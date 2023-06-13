const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const {
  createCourses,
  getAllCourses,
  getAllCoursesByChannelId,
  getSingleCourseById,
  updateSingleCourse,
  deleteCourse,
} = require("./courses.controller");

router.use(bodyParser.json());

router.post("/courses/:channelId", auth, createCourses);
router.get("/courses", auth, getAllCourses);
router.get("/courses/:channelId", auth, getAllCoursesByChannelId);
router.get("/course/:courseId", auth, getSingleCourseById);
router.put("/course/:courseId", auth, updateSingleCourse);
router.delete("/course/:id", auth, deleteCourse);

module.exports = router;
