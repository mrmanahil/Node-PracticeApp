const mongoose = require("mongoose");

const start = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/LMS");
    console.log("Database connected");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  start,
};
