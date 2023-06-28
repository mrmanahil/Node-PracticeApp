const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const {
  createChannel,
  getAllChannels,
  updateChannelbyId,
  getChannelbyId,
  deleteChannelById,
  subscribeChannel,
} = require("./channel.controller");

router.post("/channel", auth, createChannel);
router.post("/channel/subscribe/:channelId", auth, subscribeChannel);
router.get("/channel", auth, getAllChannels);
router.get("/channel/:id", auth, getChannelbyId);
router.put("/channel/:id", auth, updateChannelbyId);
router.delete("/channel/:id", auth, deleteChannelById);

module.exports = router;
