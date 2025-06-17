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
};

const ERROR_CODES = {
  FETCH_ERROR: "FETCH_ERROR",
  NOT_FOUND_ERROR: "NOT_FOUND_ERROR",
  CREATE_ERROR: "CREATE_ERROR",
  UPDATE_ERROR: "UPDATE_ERROR",
  DELETE_ERROR: "DELETE_ERROR",

  VALIDATION_ERROR: "VALIDATION_ERROR",
  UNIQUE_CONSTRAINT_ERROR: "UNIQUE_CONSTRAINT_ERROR",

  SERVER_ERROR: "SERVER_ERROR",
};

module.exports = {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_CODES,
};
