const { Channel } = require("./channel");
const { checkRequiredFields } = require("../../utils/validation");

const createChannel = async (req, res) => {
  try {
    const { name, slug, userId, about, thumbnail } = req.body;
    checkRequiredFields({ name, slug, userId, about }, res);
    if (await Channel.exists({ name })) {
      return res
        .status(409)
        .send({ data: { success: false, message: "Channel Name Already Exist" } });
    }
    const channel = await Channel.create({ name, slug, userId, about, thumbnail });
    res.status(200).send({ success: true, message: "Channel Successfully Created", data: channel });
  } catch (error) {
    console.log(error);
  }
};

const getAllChannels = async (req, res) => {
  try {
    const channels = await Channel.find();
    return res.status(200).send({
      message: "Fetched Successfully",
      success: true,
      data: channels,
    });
  } catch (error) {
    console.log(error);
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
    const { id } = req.params;
    const { name } = req.body;
    checkRequiredFields({ name }, res);
    const channel = await Channel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).send({ success: true, message: "Update Success", data: channel });
  } catch (error) {
    console.log(error);
  }
};

const deleteChannelById = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
    const channel = await Channel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Deleted Successfully",
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
