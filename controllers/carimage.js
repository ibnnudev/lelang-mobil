const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_CODES,
} = require("../constants/messages");
const {
  getAll,
  getByCarId,
  getById,
  destroy,
  store,
  update,
} = require("../repositories/carimage");
const { handleRepositoryCall } = require("../utils/handler");

const ENTITY_NAME = "CarImage";

const carImageController = {
  getAll: async (req, res) => {
    await handleRepositoryCall(
      res,
      () => getAll(),
      (_) => SUCCESS_MESSAGES.FETCH_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  getById: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => getById(id),
      (_) => SUCCESS_MESSAGES.FETCH_ONE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  getByCarId: async (req, res) => {
    const { carId } = req.params;
    await handleRepositoryCall(
      res,
      () => getByCarId(carId),
      (_) => SUCCESS_MESSAGES.FETCH_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  store: async (req, res) => {
    const carImageData = req.body;
    await handleRepositoryCall(
      res,
      () => store(carImageData, req.file),
      (_) => SUCCESS_MESSAGES.CREATE_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.CREATE_FAILED(ENTITY_NAME),
      ERROR_CODES.CREATE_ERROR
    );
  },
  update: async (req, res) => {
    const { id } = req.params;
    const carImageData = req.body;
    await handleRepositoryCall(
      res,
      () => update(id, carImageData, req.file),
      (_) => SUCCESS_MESSAGES.UPDATE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.UPDATE_FAILED(ENTITY_NAME),
      ERROR_CODES.UPDATE_ERROR
    );
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => destroy(id),
      (_) => SUCCESS_MESSAGES.DELETE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.DELETE_FAILED(ENTITY_NAME),
      ERROR_CODES.DELETE_ERROR
    );
  },
};

module.exports = carImageController;
