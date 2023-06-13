const { checkRequiredFields } = require("../../utils/validation");
const { Courses } = require("../courses/courses");
const { Videos } = require("../videos/videos");

const createCourses = async (req, res) => {
  try {
    const { title, thumbnail, videoId } = req.body;
    const { channelId } = req.params;
    const requiredFields = { title, thumbnail, videoId };
    checkRequiredFields(requiredFields, res);
    const allVideos = await Videos.find({ channelId });
    const IDs = allVideos?.map((item) => item?._id);
    const course = await Courses.create({
      videoId: IDs,
      thumbnail,
      title,
      channelId,
    });
    res.status(200).send({
      message: "Course Created Successfully",
      success: true,
      data: { course, videos: allVideos },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Courses.find();
    res.status(200).send({
      message: "Fetched Successfully",
      success: true,
      data: courses,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllCoursesByChannelId = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channelListByChannelId = await Courses.find({ channelId });
    !channelListByChannelId &&
      res.status(200).send({
        message: "No Data Found",
        success: true,
      });
    channelListByChannelId &&
      res.status(200).send({
        message: "Fetched Successfully",
        success: true,
        data: channelListByChannelId,
      });
  } catch (error) {
    console.log(error);
  }
};

const getSingleCourseById = async (req, res) => {
  try {
    const { courseId } = req.params;
    const response = await Courses.findById(courseId);
    response &&
      res.status(200).send({
        message: "Fetched Successfully",
        success: true,
        data: response,
      });
  } catch (error) {
    console.log(error);
  }
};

const updateSingleCourse = async (req, res) => {
  try {
    console.log(req.user);
    const { courseId } = req.params;
    const { title, thumbnail, videoId } = req.body;
    const requiredFields = { title, thumbnail, videoId };
    checkRequiredFields(requiredFields, res);
    const course = await Courses.findByIdAndUpdate(
      courseId,
      {
        title,
        thumbnail,
        videoId,
      },
      { new: true }
    );
    res.status(200).send({
      message: "Updated Successfully",
      success: true,
      data: course,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Courses.findByIdAndDelete(id);
    course &&
      res.status(200).send({
        message: "Deleted Successfully",
        success: true,
        data: course,
      });
    !course &&
      res.status(404).send({
        message: "Course Not Found",
        success: false,
      });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCourses,
  getAllCourses,
  getAllCoursesByChannelId,
  getSingleCourseById,
  updateSingleCourse,
  deleteCourse,
};
