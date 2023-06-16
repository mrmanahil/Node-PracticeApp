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
    const channel = await Channel.create({
      name,
      slug,
      userId,
      about,
      thumbnail,
      isSubscribed: false,
      subscribersCount: 0,
    });
    res.status(200).send({ success: true, message: "Channel Successfully Created", data: channel });
  } catch (error) {
    console.log(error);
  }
};

const subscribeChannel = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId);
    if (!channel) {
      res.status(404).send({
        message: "Channel Not Found",
        success: false,
      });
    }
    const { user_id } = req.user;
    const isSubscribed = channel.subscribers.includes(user_id);
    if (isSubscribed) {
      channel.subscribers.pull(user_id);
      channel.subscribersCount--;
    } else {
      channel.subscribers.push(user_id);
      channel.subscribersCount++;
    }
    await channel.save();
    channel.isSubscribed = channel.subscribers.includes(user_id);
    res.status(200).send({
      message: `Channel ${isSubscribed ? "UnSubscribed" : "Subscribed"} Successfully`,
      success: true,
      data: { channel },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllChannels = async (req, res) => {
  try {
    const { user_id } = req.user;
    const channels = await Channel.find();
    const updatedChannels = channels.map((channel) => {
      const isSubscribed = channel.subscribers.includes(user_id);
      return { ...channel._doc, isSubscribed };
    });
    return res.status(200).send({
      message: "Fetched Successfully",
      success: true,
      data: updatedChannels,
    });
  } catch (error) {
    console.log(error);
  }
};

const getChannelbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    const channel = await Channel.findById(id);
    !channel && res.status(404).send({ message: "Channel Not Found", success: false });
    const isSubscribed = channel.subscribers.includes(user_id);
    res.status(200).send({
      message: "Fetch Success",
      success: true,
      data: { ...channel._doc, isSubscribed },
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
    !channel && res.status(404).send({ message: "Channel Not Found", success: false });
    const isSubscribed = channel.subscribers.includes(req.user.user_id);
    res
      .status(200)
      .send({ success: true, message: "Update Success", data: { ...channel._doc, isSubscribed } });
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
    const { user_id } = req.user;
    const isSubscribed = channel.subscribers.includes(user_id);
    res.status(200).send({
      success: true,
      message: "Deleted Successfully",
      data: { ...channel._doc, isSubscribed },
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
  subscribeChannel,
};
