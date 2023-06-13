const cloudinary = require("cloudinary").v2;

const handleUploadImages = async (req, res) => {
  try {
    const file = req?.file?.path;
    await cloudinary.uploader
      .upload(file, { resource_type: "image" })
      .then((result) => {
        res.status(200).send({
          success: false,
          message: "Uploaded",
          data: result,
        });
      });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { handleUploadImages };
