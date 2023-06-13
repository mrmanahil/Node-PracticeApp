const { User } = require("./user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkRequiredFields } = require("../../utils/validation");

const handleRegister = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;
  try {
    checkRequiredFields({ role, password, email, first_name, last_name }, res);
    const userExists = await User.exists({ email });
    if (userExists) {
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
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .send({ success: false, message: "User Not Available" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res
        .status(404)
        .send({ success: false, message: "Invalid Password" });
    }
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
    const user = await User.findByIdAndUpdate(
      req.user.user_id,
      {
        ...req.body,
      },
      { new: true }
    );
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

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).send({
      message: "Fetched Successfully",
      success: true,
      data: allUsers,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    !id &&
      res.status(404).send({
        message: "No User Id Found",
        success: false,
      });
    id &&
      res.status(200).send({
        message: "Fetched Successfully",
        success: true,
        data: user,
      });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).send({
      message: "Deleted Successfully",
      success: true,
      data: user,
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
  getAllUsers,
  getUserById,
  deleteUser,
};
