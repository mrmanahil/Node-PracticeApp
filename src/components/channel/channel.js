const { default: mongoose } = require("mongoose");
const { User } = require("../users/user");

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
    // userId: {
    //   type: String,
    //   required: false,
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
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
