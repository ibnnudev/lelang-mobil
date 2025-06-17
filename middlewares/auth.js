const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/response-handler");
const { ERROR_MESSAGES, ERROR_CODES } = require("../constants/messages");
require("dotenv").config();

const authencticate = (req, res, next) => {
  const authHeader = req.headers["x-token-anjay"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return errorResponse(
      res,
      ERROR_MESSAGES.UNAUTHORIZED,
      ERROR_CODES.UNAUTHORIZED_ERROR,
      401,
      "No token provided. Please provide a valid JWT token in the Authorization header."
    );
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name == "TokenExpiredError") {
        return errorResponse(
          res,
          ERROR_MESSAGES.TOKEN_EXPIRED,
          ERROR_CODES.TOKEN_EXPIRED,
          401,
          "Token has expired. Please log in again to obtain a new token."
        );
      }
      return errorResponse(
        res,
        ERROR_MESSAGES.TOKEN_INVALID,
        ERROR_CODES.TOKEN_INVALID,
        401,
        "Invalid token. Please provide a valid JWT token."
      );
    }

    req.user = user;
    next();
  });
};

module.exports = authencticate;
