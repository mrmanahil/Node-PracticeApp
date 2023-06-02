const Joi = require("joi");
const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    profile_picture: {
      type: String,
      required: false,
      default: "",
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("User", schema);

module.exports = { User };
