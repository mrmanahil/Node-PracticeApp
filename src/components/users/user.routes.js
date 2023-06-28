const express = require("express");
const router = express.Router();
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
  updateUserById,
} = require("./user.controller");

router.post("/register", handleRegister);
router.post("/signin", handleLogin);
router.put("/profile/me", auth, handleProfileUpdate);
router.put("/profile/:id", auth, updateUserById);
router.get("/students", auth, getAllStudents);
router.get("/teachers", auth, getAllTeachers);
router.get("/all", auth, getAllUsers);
router.get("/user/:id", auth, getUserById);
router.delete("/user/:id", auth, deleteUser);

module.exports = router;
