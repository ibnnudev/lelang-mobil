const carRepository = require("../repositories/car");
const { handleRepositoryCall } = require("../utils/handler");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_CODES,
} = require("../constants/messages");
const { errorResponse } = require("../utils/response-handler");

const ENTITY_NAME = "Car";

const carController = {
  getAll: async (req, res) => {
    await handleRepositoryCall(
      res,
      () => carRepository.getAll(),
      (data) => SUCCESS_MESSAGES.FETCH_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  getById: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      async () => {
        const car = await carRepository.getById(id);
        if (!car) {
          return errorResponse(
            res,
            ERROR_MESSAGES.NOT_FOUND(ENTITY_NAME, id),
            404,
            ERROR_CODES.NOT_FOUND_ERROR
          );
        }
        return car;
      },
      (car) => SUCCESS_MESSAGES.FETCH_ONE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  store: async (req, res) => {
    const carData = req.body;
    await handleRepositoryCall(
      res,
      () => carRepository.store(carData),
      (newCar) => SUCCESS_MESSAGES.CREATE_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.CREATE_FAILED(ENTITY_NAME),
      ERROR_CODES.CREATE_ERROR,
      201
    );
  },
  update: async (req, res) => {
    const { id } = req.params;
    const carData = req.body;
    await handleRepositoryCall(
      res,
      () => carRepository.update(id, carData),
      (updatedCar) => SUCCESS_MESSAGES.UPDATE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.UPDATE_FAILED(ENTITY_NAME),
      ERROR_CODES.UPDATE_ERROR
    );
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => carRepository.destroy(id),
      (result) => SUCCESS_MESSAGES.DELETE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.DELETE_FAILED(ENTITY_NAME),
      ERROR_CODES.DELETE_ERROR
    );
  },
};

module.exports = carController;
