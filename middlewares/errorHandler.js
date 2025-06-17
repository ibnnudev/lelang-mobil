const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
    error: err.message,
  });
  next();
};

module.exports = errorHandler;
