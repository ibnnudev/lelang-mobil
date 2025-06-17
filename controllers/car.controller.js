const carRepository = require("../repositories/car.repository");
const { successResponse, errorResponse } = require("../utils/response-handler");

const carController = {
  getAll: async (req, res) => {
    try {
      const cars = await carRepository.getAll();
      successResponse(res, "Cars retrieved successfully.", cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
      errorResponse(res, "Failed to retrieve cars.", 500, "CAR_FETCH_ERROR");
    }
  },

  getById: async (req, res) => {
    const { id } = req.params;
    try {
      const car = await carRepository.getById(id);
      if (!car) {
        return errorResponse(
          res,
          `Car with ID ${id} not found.`,
          404,
          "CAR_NOT_FOUND"
        );
      }
      successResponse(res, `Car with ID ${id} retrieved successfully.`, car);
    } catch (error) {
      console.error(`Error fetching car with ID ${id}:`, error);

      errorResponse(res, "Failed to retrieve car.", 500, "CAR_FETCH_ERROR");
    }
  },

  store: async (req, res) => {
    const carData = req.body;
    try {
      const newCar = await carRepository.store(carData);

      successResponse(res, "Car created successfully.", newCar, 201);
    } catch (error) {
      console.error("Error creating car:", error);

      if (error.name === "ValidationError") {
        const errors = Object.keys(error.errors).map((key) => ({
          field: key,
          message: error.errors[key].message,
        }));
        return errorResponse(
          res,
          "Invalid car data provided.",
          422,
          "VALIDATION_ERROR",
          errors
        );
      }
      errorResponse(res, "Failed to create car.", 400, "CAR_CREATE_ERROR");
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    try {
      const updatedCar = await carRepository.update(id, carData);
      if (!updatedCar) {
        return errorResponse(
          res,
          `Car with ID ${id} not found or no changes made.`,
          404,
          "CAR_UPDATE_FAILED"
        );
      }
      successResponse(
        res,
        `Car with ID ${id} updated successfully.`,
        updatedCar
      );
    } catch (error) {
      console.error(`Error updating car with ID ${id}:`, error);
      errorResponse(res, "Failed to update car.", 500, "CAR_UPDATE_ERROR");
    }
  },

  destroy: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await carRepository.destroy(id);
      if (!result || result.deletedCount === 0) {
        return errorResponse(
          res,
          `Car with ID ${id} not found.`,
          404,
          "CAR_NOT_FOUND"
        );
      }
      successResponse(res, `Car with ID ${id} deleted successfully.`, { id });
    } catch (error) {
      console.error(`Error deleting car with ID ${id}:`, error);
      errorResponse(res, "Failed to delete car.", 500, "CAR_DELETE_ERROR");
    }
  },
};

module.exports = carController;
