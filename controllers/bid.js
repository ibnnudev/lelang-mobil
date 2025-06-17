const {
  SUCCESS_MESSAGES,
  ERROR_CODES,
  ERROR_MESSAGES,
} = require("../constants/messages");
const bidRepository = require("../repositories/bid");
const { handleRepositoryCall } = require("../utils/handler");

const ENTITY_NAME = "Bid";

const bidController = {
  getAll: async (req, res) => {
    await handleRepositoryCall(
      res,
      () => bidRepository.getAll(),
      (data) => SUCCESS_MESSAGES.FETCH_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  getById: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => bidRepository.getById(id),
      (data) => SUCCESS_MESSAGES.FETCH_ONE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  store: async (req, res) => {
    const bidData = req.body;
    await handleRepositoryCall(
      res,
      () => bidRepository.store(bidData),
      (data) => SUCCESS_MESSAGES.CREATE_SUCCESS(ENTITY_NAME, data.id),
      ERROR_MESSAGES.CREATE_FAILED(ENTITY_NAME),
      ERROR_CODES.CREATE_ERROR
    );
  },
  update: async (req, res) => {
    const { id } = req.params;
    const bidData = req.body;
    await handleRepositoryCall(
      res,
      () => bidRepository.update(id, bidData),
      (data) => SUCCESS_MESSAGES.UPDATE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.UPDATE_FAILED(ENTITY_NAME),
      ERROR_CODES.UPDATE_ERROR
    );
  },
  retracted: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => bidRepository.retracted(id),
      () => SUCCESS_MESSAGES.DELETE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.DELETE_FAILED(ENTITY_NAME),
      ERROR_CODES.DELETE_ERROR
    );
  },
  getByAuctionId: async (req, res) => {
    const { auction_id } = req.params;
    await handleRepositoryCall(
      res,
      () => bidRepository.getByAuctionId(auction_id),
      (data) => SUCCESS_MESSAGES.FETCH_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
};

module.exports = bidController;
