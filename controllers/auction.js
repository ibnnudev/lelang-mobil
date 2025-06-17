const auctionRepository = require("../repositories/auction");
const { handleRepositoryCall } = require("../utils/handler");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  ERROR_CODES,
} = require("../constants/messages");
const { errorResponse } = require("../utils/response-handler");

const ENTITY_NAME = "Auction";

const auctionController = {
  getAll: async (req, res) => {
    const { status, start_time, end_time } = req.query;
    const filters = {
      status: status || undefined,
      start_time: start_time ? new Date(start_time) : undefined,
      end_time: end_time ? new Date(end_time) : undefined,
    };
    await handleRepositoryCall(
      res,
      () => auctionRepository.getWithFilters(filters),
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
        const auction = auctionRepository.getById(id);
        if (!auction) {
          return errorResponse(
            res,
            ERROR_MESSAGES.NOT_FOUND(ENTITY_NAME, id),
            ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
            ERROR_CODES.FETCH_ERROR
          );
        }
        return auction;
      },
      (auction) => SUCCESS_MESSAGES.FETCH_ONE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.FETCH_FAILED(ENTITY_NAME),
      ERROR_CODES.FETCH_ERROR
    );
  },
  store: async (req, res) => {
    const auctionData = req.body;
    await handleRepositoryCall(
      res,
      () => auctionRepository.store(auctionData),
      (data) => SUCCESS_MESSAGES.FETCH_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.FETCH_FAILED,
      ERROR_CODES.FETCH_ERROR
    );
  },
  update: async (req, res) => {
    const { id } = req.params;
    const auctionData = req.body;
    await handleRepositoryCall(
      res,
      () => auctionRepository.update(id, auctionData),
      (updatedAuction) => SUCCESS_MESSAGES.UPDATE_SUCCESS(ENTITY_NAME, id),
      ERROR_MESSAGES.UPDATE_FAILED,
      ERROR_CODES.UPDATE_ERROR
    );
  },
  destroy: async (req, res) => {
    const { id } = req.params;
    await handleRepositoryCall(
      res,
      () => auctionRepository.destroy(id),
      (data) => SUCCESS_MESSAGES.DELETE_SUCCESS(ENTITY_NAME),
      ERROR_MESSAGES.DELETE_FAILED,
      ERROR_CODES.DELETE_ERROR
    );
  },
};

module.exports = auctionController;
