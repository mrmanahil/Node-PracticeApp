const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const { createChannel, getAllChannels } = require("./channel.controller");

router.use(bodyParser.json());

router.post("/channel", auth, createChannel);
router.get("/channel", auth, getAllChannels);

module.exports = router;
