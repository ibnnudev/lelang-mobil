const successResponse = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
  });
};

const errorResponse = (
  res,
  message,
  statusCode = 400,
  code = null,
  errors = []
) => {
  return res.status(statusCode).json({
    status: "error",
    message,
    code,
    errors,
  });
};

module.exports = { successResponse, errorResponse };
