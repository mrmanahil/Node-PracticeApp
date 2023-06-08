const multer = require("multer");

const maxSize = 100 * 1024 * 1024; // Maximum file size: 100MB

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "video/mp4" ||
    file.mimetype === "video/quicktime" ||
    file.mimetype === "video/x-msvideo" ||
    file.mimetype === "video/x-flv" ||
    file.mimetype === "video/x-matroska"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    cb(new Error("Only MP4, MOV, AVI, FLV, and MKV formats are allowed"));
  }
};

const videoUpload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize },
});

module.exports = { videoUpload };
