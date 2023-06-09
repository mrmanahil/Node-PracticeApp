const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const {
  createChannel,
  getAllChannels,
  updateChannelbyId,
  getChannelbyId,
  deleteChannelById,
} = require("./channel.controller");

router.use(bodyParser.json());

router.post("/channel", auth, createChannel);
router.get("/channel", auth, getAllChannels);
router.get("/channel/:id", auth, getChannelbyId);
router.put("/channel/:id", auth, updateChannelbyId);
router.delete("/channel/:id", auth, deleteChannelById);

module.exports = router;
