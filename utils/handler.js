const { successResponse, errorResponse } = require("./response-handler");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_CODES,
} = require("../constants/messages");

const handleRepositoryCall = async (
  res,
  callback,
  successMessageBuilder,
  errorMessage,
  errorCode,
  successStatusCode = 200
) => {
  try {
    const data = await callback();
    successResponse(res, successMessageBuilder(data), data, successStatusCode);
  } catch (error) {
    // if (error.stack) {
    //   console.error("handleRepositoryCall: Error stack:", error.stack);
    // }

    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return errorResponse(
        res,
        ERROR_MESSAGES.INVALID_DATA,
        422,
        ERROR_CODES.VALIDATION_ERROR,
        errors
      );
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      const field = error.errors[0]?.path;
      const value = error.errors[0]?.value;
      const specificMessage = ERROR_MESSAGES.UNIQUE_VALUE_TAKEN(field, value);
      return errorResponse(
        res,
        specificMessage,
        409,
        ERROR_CODES.UNIQUE_CONSTRAINT_ERROR,
        [{ field: field, message: specificMessage }]
      );
    }

    if (error.name === "ValidationError") {
      const errors = Object.keys(error.errors).map((key) => ({
        field: key,
        message: error.errors[key].message,
      }));
      return errorResponse(
        res,
        ERROR_MESSAGES.INVALID_DATA,
        422,
        ERROR_CODES.VALIDATION_ERROR,
        errors
      );
    }
    errorResponse(res, errorMessage, 500, errorCode);
  }
};

module.exports = {
  handleRepositoryCall,
};
