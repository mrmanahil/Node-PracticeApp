const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: false,
      default: "",
    },
    isSubscribed: {
      type: Boolean,
      default: false,
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    subscribersCount: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const Channel = mongoose.model("Channel", schema);

module.exports = { Channel };
