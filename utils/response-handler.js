const successResponse = (res, message, data = {}, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    message,
    data,
    count: Array.isArray(data) ? data.length : Object.keys(data).length,
    timestamp: new Date().toISOString(),
    requestId: res.locals.requestId || null,
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
