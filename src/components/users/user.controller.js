const { User } = require("./user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { checkRequiredFields } = require("../../utils/validation");

const handleRegister = async (req, res) => {
  try {
    const { first_name, last_name, email, password, role } = req.body;
    checkRequiredFields({ role, password, email, first_name, last_name }, res);
    if (await User.exists({ email }))
      return res.status(409).send({ data: { success: false, message: "User Already Exist" } });
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
      role,
    });
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
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
  try {
    const { email, password } = req.body;
    checkRequiredFields({ password, email }, res);
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(404).send({ success: false, message: "Invalid email or password" });
    const token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY);
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
    const { password, role, ...updateData } = req.body;
    const user = await User.findById(req.user.user_id);
    if (role && user.role !== role)
      return res.status(403).send({ success: false, message: "Changing role is not allowed" });
    if (password) updateData.password = await bcrypt.hash(password, 10);
    const updatedUser = await User.findByIdAndUpdate(req.user.user_id, updateData, { new: true });
    if (updatedUser)
      res.status(200).send({ success: true, message: "Updated Successfully", data: updatedUser });
  } catch (error) {
    console.log(error);
  }
};

const updateUserById = async (req, res) => {
  try {
    const { password, role, ...updateData } = req.body;
    const user = await User.findById(req.user.user_id);
    if (role && user.role !== role) {
      return res.status(500).send({ success: false, message: "Changing Role Is Not Allowed" });
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    !updateUser && res.status(404).send({ success: false, message: "User Not Found" });
    if (password) updateData.password = await bcrypt.hash(password, 10);
    if (user.role === "SUPER_ADMIN" && updateUser) {
      res
        .status(200)
        .send({ data: { success: true, message: "User Updated Successfully", updateUser } });
    } else {
      res.status(400).send({ success: false, message: "Unauthorized" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "STUDENT" });
    res.status(200).send({ success: true, data: students });
  } catch (error) {
    console.log(error);
  }
};

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "TEACHER" });
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
    if (!id) {
      return res.status(404).send({ message: "No User Id Found", success: false });
    }
    res.status(200).send({ message: "Fetched Successfully", success: true, data: user });
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
  updateUserById,
};
