const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Videos",
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Comment = mongoose.model("Comment", schema);

module.exports = { Comment };
