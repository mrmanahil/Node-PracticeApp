const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const auth = require("../../middleware/auth");
const {
  handleRegister,
  handleLogin,
  handleProfileUpdate,
  getAllStudents,
  getAllTeachers,
} = require("./user.controller");

router.use(bodyParser.json());

router.post("/register", handleRegister);
router.post("/signin", handleLogin);
router.put("/profile/me", auth, handleProfileUpdate);
router.get("/students", auth, getAllStudents);
router.get("/teachers", auth, getAllTeachers);

module.exports = router;
