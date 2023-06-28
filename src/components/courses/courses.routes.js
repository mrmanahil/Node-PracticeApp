const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  createCourses,
  getAllCourses,
  getAllCoursesByChannelId,
  getSingleCourseById,
  updateSingleCourse,
  deleteCourse,
  getVideosByCourseId,
} = require("./courses.controller");

router.post("/courses/:channelId", auth, createCourses);
router.get("/courses", auth, getAllCourses);
router.get("/course/videos/:courseId", auth, getVideosByCourseId);
router.get("/courses/:channelId", auth, getAllCoursesByChannelId);
router.get("/course/:courseId", auth, getSingleCourseById);
router.put("/course/:courseId", auth, updateSingleCourse);
router.delete("/course/:id", auth, deleteCourse);

module.exports = router;
