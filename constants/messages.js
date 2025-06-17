const SUCCESS_MESSAGES = {
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
  FETCH_FAILED: (entityName) =>
    `Failed to retrieve ${entityName.toLowerCase()}s.`,
  NOT_FOUND: (entityName, id) => `${entityName} with ID ${id} not found.`,
  CREATE_FAILED: (entityName) =>
    `Failed to create ${entityName.toLowerCase()}.`,
  UPDATE_FAILED: (entityName) =>
    `Failed to update ${entityName.toLowerCase()}.`,
  DELETE_FAILED: (entityName) =>
    `Failed to delete ${entityName.toLowerCase()}.`,

  INVALID_DATA: "Invalid data provided.",
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
};

const ERROR_CODES = {
  FETCH_ERROR: "FETCH_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  CREATE_ERROR: "CREATE_ERROR",
  UPDATE_ERROR: "UPDATE_ERROR",
  DELETE_ERROR: "DELETE_ERROR",

  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNIQUE_CONSTRAINT_ERROR: "UNIQUE_CONSTRAINT_ERROR",
  INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
  NOT_IMPLEMENTED_ERROR: "NOT_IMPLEMENTED_ERROR",
  SERVICE_UNAVAILABLE_ERROR: "SERVICE_UNAVAILABLE_ERROR",
  GATEWAY_TIMEOUT_ERROR: "GATEWAY_TIMEOUT_ERROR",
  METHOD_NOT_ALLOWED_ERROR: "METHOD_NOT_ALLOWED_ERROR",
  NOT_ACCEPTABLE_ERROR: "NOT_ACCEPTABLE_ERROR",
  TOO_MANY_REQUESTS_ERROR: "TOO_MANY_REQUESTS_ERROR",
  PRECONDITION_FAILED_ERROR: "PRECONDITION_FAILED_ERROR",
  EXPECTATION_FAILED_ERROR: "EXPECTATION_FAILED_ERROR",
  SERVER_ERROR: "SERVER_ERROR",
  UNAUTHORIZED_ERROR: "UNAUTHORIZED_ERROR",
  FORBIDDEN_ERROR: "FORBIDDEN_ERROR",
  BAD_REQUEST_ERROR: "BAD_REQUEST_ERROR",
  UNPROCESSABLE_ENTITY_ERROR: "UNPROCESSABLE_ENTITY_ERROR",
  CONFLICT_ERROR: "CONFLICT_ERROR",
};

module.exports = {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_CODES,
};
