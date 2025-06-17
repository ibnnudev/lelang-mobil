const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: (entityName) => `${entityName} logged in successfully.`,
  FETCH_SUCCESS: (entityName) => `${entityName}s retrieved successfully.`,
  FETCH_ONE_SUCCESS: (entityName, id) =>
    `${entityName} with ID ${id} retrieved successfully.`,
  CREATE_SUCCESS: (entityName) => `${entityName} created successfully.`,
  UPDATE_SUCCESS: (entityName, id) =>
    `${entityName} with ID ${id} updated successfully.`,
  DELETE_SUCCESS: (entityName, id) =>
    `${entityName} with ID ${id} deleted successfully.`,
};

const ERROR_MESSAGES = {
  UNAUTHORIZED: "Unauthorized access.",
  TOKEN_EXPIRED: "Token has expired. Please log in again.",
  TOKEN_INVALID: "Invalid token. Please log in again.",
  INVALID_DATA: "Invalid data provided.",
  INTERNAL_SERVER_ERROR: "Internal Server Error",

  FETCH_FAILED: (entityName) =>
    `Failed to retrieve ${entityName.toLowerCase()}s.`,
  NOT_FOUND: (entityName, id) => `${entityName} with ID ${id} not found.`,
  CREATE_FAILED: (entityName) =>
    `Failed to create ${entityName.toLowerCase()}.`,
  UPDATE_FAILED: (entityName) =>
    `Failed to update ${entityName.toLowerCase()}.`,
  DELETE_FAILED: (entityName) =>
    `Failed to delete ${entityName.toLowerCase()}.`,
  UNIQUE_VALUE_TAKEN: (field, value) =>
    `The ${field} '${value}' is already taken.`,

  INTERNAL_SERVER_ERROR: "Internal Server Error",
  VALIDATION_ERROR: "Validation error occurred.",
  UNIQUE_CONSTRAINT_ERROR: "Unique constraint error occurred.",
  UNAUTHORIZED: "Unauthorized access.",
  FORBIDDEN: "Forbidden access.",
  BAD_REQUEST: "Bad request. Please check your input.",
  UNPROCESSABLE_ENTITY: "Unprocessable entity. Please check your input.",
  CONFLICT:
    "Conflict error. The request could not be completed due to a conflict with the current state of the resource.",
  NOT_IMPLEMENTED: "This feature is not implemented yet.",
  SERVICE_UNAVAILABLE:
    "Service is currently unavailable. Please try again later.",
  GATEWAY_TIMEOUT: "Gateway timeout. The server took too long to respond.",
  METHOD_NOT_ALLOWED: "Method not allowed. Please check the request method.",
  NOT_ACCEPTABLE:
    "Not acceptable. The requested resource is not available in a format that is acceptable to the client.",
  TOO_MANY_REQUESTS: "Too many requests. Please slow down your request rate.",
  PRECONDITION_FAILED:
    "Precondition failed. The request could not be completed due to a precondition failure.",
  EXPECTATION_FAILED:
    "Expectation failed. The server could not meet the requirements of the Expect request-header field.",
  PAYLOAD_TOO_LARGE:
    "Payload too large. The request payload is larger than the server is willing or able to process.",
  TOKEN_EXPIRED: "Token has expired. Please log in again.",
  TOKEN_INVALID: "Invalid token. Please log in again.",
};

const ERROR_CODES = {
  FETCH_ERROR: 500,
  NOT_FOUND_ERROR: 404,
  CREATE_ERROR: 500,
  UPDATE_ERROR: 500,
  DELETE_ERROR: 500,

  VALIDATION_ERROR: 422,
  UNIQUE_CONSTRAINT_ERROR: 409,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED_ERROR: 501,
  SERVICE_UNAVAILABLE_ERROR: 503,
  GATEWAY_TIMEOUT_ERROR: 504,
  METHOD_NOT_ALLOWED_ERROR: 405,
  NOT_ACCEPTABLE_ERROR: 406,
  TOO_MANY_REQUESTS_ERROR: 429,
  PRECONDITION_FAILED_ERROR: 412,
  EXPECTATION_FAILED_ERROR: 417,
  SERVER_ERROR: 500,
  FORBIDDEN_ERROR: 403,
  BAD_REQUEST_ERROR: 400,
  UNPROCESSABLE_ENTITY_ERROR: 422,
  CONFLICT_ERROR: 409,

  TOKEN_EXPIRED: 401,
  TOKEN_INVALID: 401,
  LOGIN_ERROR: 401,

  UNAUTHORIZED_ERROR: 401,
};

module.exports = {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_CODES,
};
