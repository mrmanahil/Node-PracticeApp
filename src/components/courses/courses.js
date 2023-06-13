const Joi = require("joi");
const { default: mongoose, Schema } = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    channelId: {
      type: String,
      required: true,
    },
    videoId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videos",
        required: true,
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

const Courses = mongoose.model("Courses", schema);

module.exports = { Courses };
