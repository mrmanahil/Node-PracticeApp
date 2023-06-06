const { Channel } = require("./channel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// const multer = require("multer");
const cloudinary = require("../../libs/cloudinary");
const { checkRequiredFields } = require("../../utils/validation");

// Register
const createChannel = async (req, res) => {
  try {
    const { name, slug, userId, about, thumbnail } = req.body;
    const requiredFields = { name, slug, userId, about };
    checkRequiredFields(requiredFields, res);
    const oldChannel = await Channel.findOne({ name });
    if (oldChannel) {
      return res.status(409).send({
        data: { success: false, message: "Channel Name Already Exist" },
      });
    }
    const channel = await Channel.create({
      name,
      slug,
      userId,
      about,
      thumbnail,
    });
    res.status(200).send({
      success: true,
      message: "Channel Successfully Created",
      data: channel,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllChannels = async (req, res) => {
  try {
    const response = await Channel.find();
    return res.status(200).send({
      message: "Fetched Successfully",
      success: true,
      data: response,
    });
  } catch (error) {
    console.log(error, "GET ALL CHANNELS API ERROR");
  }
};

module.exports = {
  createChannel,
  getAllChannels,
};
