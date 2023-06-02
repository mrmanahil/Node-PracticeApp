const express = require("express");

const bodyParser = require("body-parser");

const router = express.Router();

const {
  handleRegister,
  handleLogin,
} = require("../components/users/user.controller");

router.post("/register", bodyParser.json(), handleRegister);
router.post("/signin", bodyParser.json(), handleLogin);

module.exports = router;
