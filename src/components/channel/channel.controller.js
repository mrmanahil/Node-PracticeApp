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

const getChannelbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channel.findById(id);
    res.status(200).send({
      message: "Fetch Success",
      success: true,
      data: channel,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateChannelbyId = async (req, res) => {
  try {
    const { params, body } = req;
    const channel = await Channel.findByIdAndUpdate(
      params.id,
      { ...body },
      { new: true }
    );
    res.status(200).send({
      message: "Update Success",
      success: true,
      data: channel,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteChannelById = async (req, res) => {
  try {
    const { params, body } = req;
    const channel = await Channel.findByIdAndDelete(params.id);
    res.status(200).send({
      message: "Deleted Successfully",
      success: true,
      data: channel,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createChannel,
  getAllChannels,
  getChannelbyId,
  updateChannelbyId,
  deleteChannelById,
};
