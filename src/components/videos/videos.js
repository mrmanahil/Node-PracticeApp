const Joi = require("joi");
const { default: mongoose, Schema } = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
      default: "",
    },
    subtitles: {
      type: [Schema.Types.Mixed],
      required: true,
    },
    videoURL: {
      type: String,
      required: true,
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel",
      required: false,
    },
    channelId: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Videos = mongoose.model("Videos", schema);

module.exports = { Videos };
