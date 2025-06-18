const multer = require("multer");

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof multer.MulterError) {
    console.error("Multer Error:", err);
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        status: "error",
        message: "File is too large. Maximum size is 5MB.",
        error: err.message,
      });
    }
    return res.status(400).json({
      status: "error",
      message: err.message,
      error: err.code,
    });
  } else if (err.message === "Only image files are allowed!") {
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } else {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

module.exports = errorHandler;
