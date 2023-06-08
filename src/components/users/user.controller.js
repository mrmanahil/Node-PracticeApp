const { User } = require("./user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkRequiredFields } = require("../../utils/validation");
// const multer = require("multer");
const cloudinary = require("../../libs/cloudinary");

// Register
const handleRegister = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    const requiredFields = { role, password, email, first_name, last_name };
    checkRequiredFields(requiredFields, res);
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res
        .status(409)
        .send({ data: { success: false, message: "User Already Exist" } });
    }
    encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      role,
    });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;
    res.status(200).send({
      success: true,
      message: "User Successfully Created",
      data: { user, accessToken: token },
    });
  } catch (error) {
    console.log(error);
  }
};

const handleLogin = async (req, res) => {
  console.log("first");
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    !user &&
      res.status(404).send({ success: false, message: "User Not Available" });
    const validpass = await bcrypt.compare(password, user.password);
    !validpass &&
      res.status(404).send({ success: false, message: "Invalid Password" });
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      data: { ...user._doc, accessToken: token },
    });
  } catch (error) {
    console.log(error);
  }
};

const handleProfileUpdate = async (req, res) => {
  try {
    // const result = await cloudinary.uploader.upload(req.file.path, {
    //   folder: "samples",
    // });
    const user = await User.findByIdAndUpdate(req.user.user_id, {
      ...req.body,
    });
    if (user) {
      res.status(200).send({
        succes: true,
        message: "Updated Successfully",
        data: user,
      });
    }
  } catch (error) {}
};

const getAllStudents = async (req, res) => {
  try {
    let role = "STUDENT";
    const students = await User.find({ role });
    res.status(200).send({
      success: true,
      data: students,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    let role = "TEACHER";
    const teachers = await User.find({ role });
    res.status(200).send({
      success: true,
      data: teachers,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleRegister,
  handleLogin,
  handleProfileUpdate,
  getAllTeachers,
  getAllStudents,
};
