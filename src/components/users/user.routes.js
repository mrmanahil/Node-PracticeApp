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
  getAllUsers,
  getUserById,
  deleteUser,
} = require("./user.controller");

router.use(bodyParser.json());

router.post("/register", handleRegister);
router.post("/signin", handleLogin);
router.put("/profile/me", auth, handleProfileUpdate);
router.get("/students", auth, getAllStudents);
router.get("/teachers", auth, getAllTeachers);
router.get("/all", auth, getAllUsers);
router.get("/user/:id", auth, getUserById);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
