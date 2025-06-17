const {
  SUCCESS_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
} = require("../constants/messages");
const transactionRepository = require("../repositories/transaction");
const { handleRepositoryCall } = require("../utils/handler");

const ENTITY_NAME = "Transaction";

const transactionController = {
  getAll: async (req, res) => {
    await handleRepositoryCall(
      res,
      () => transactionRepository.getAll(),
      (data) => SUCCESS_MESSAGES.FETCH_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },

  getById: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => transactionRepository.getById(id),
      (data) => SUCCESS_MESSAGES.FETCH_ONE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },

  initiateTransaction: async (req, res) => {
    const transactionData = req.body;
    await handleRepositoryCall(
      res,
      () => transactionRepository.initiateTransaction(transactionData),
      (data) => SUCCESS_MESSAGES.CREATE_SUCCESS(ENTITY_NAME, data.id),
      ERROR_MESSAGES.CREATE_FAILED(ENTITY_NAME),
      ERROR_CODES.CREATE_ERROR
    );
  },

  markPaymentSuccessful: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => transactionRepository.markAsSuccessful(id),
      () => SUCCESS_MESSAGES.UPDATE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.UPDATE_FAILED(ENTITY_NAME),
      ERROR_CODES.UPDATE_ERROR
    );
  },

  markPaymentFailed: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => transactionRepository.markAsFailed(id),
      () => SUCCESS_MESSAGES.UPDATE_SUCCESS(ENTITY_NAME, id), // You might want a specific message for failed payments
      ERROR_MESSAGES.UPDATE_FAILED(ENTITY_NAME),
      ERROR_CODES.UPDATE_ERROR
    );
  },
};

module.exports = transactionController;
