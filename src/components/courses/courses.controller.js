const { checkRequiredFields } = require("../../utils/validation");
const { Courses } = require("../courses/courses");
const { Videos } = require("../videos/videos");

const createCourses = async (req, res) => {
  try {
    const { title, thumbnail, videoId } = req.body;
    const { channelId } = req.params;
    const allVideos = await Videos.find({ channelId });
    const IDs = allVideos.map((item) => item._id);
    const course = await Courses.create({
      videoId: IDs,
      thumbnail,
      title,
    });
    const requiredFields = { title, thumbnail, videoId };
    checkRequiredFields(requiredFields, res);
    res.status(200).send({
      message: "Course Created Successfully",
      success: true,
      data: { course, videos: allVideos },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCourses,
};
