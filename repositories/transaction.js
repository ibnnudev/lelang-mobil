const Transaction = require("../models/transactions");
const Auction = require("../models/auction");
const User = require("../models/user");
const auctionRepository = require("../repositories/auction");

const include = [
  {
    model: Auction,
    as: "auction",
    attributes: ["id", "car_id", "current_highest_bid"],
  },
  {
    model: User,
    as: "buyer",
    attributes: ["id", "username", "phone_number"],
  },
  {
    model: User,
    as: "seller",
    attributes: ["id", "username", "phone_number"],
  },
];

const getAll = async () => {
  try {
    const transactions = await Transaction.findAll({
      where: {
        deleted_at: null,
      },
      include: include,
      order: [["transaction_date", "DESC"]],
    });
    return transactions;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const transaction = await Transaction.findByPk(id, {
      include: include,
    });
    if (!transaction) {
      throw new Error("Transaction not found");
    }
    return transaction;
  } catch (error) {
    console.error(`Error fetching transaction with ID ${id}:`, error);
    throw error;
  }
};

const initiateTransaction = async (transactionData) => {
  try {
    const auction = await Auction.findOne({
      where: {
        id: transactionData.auction_id,
        highest_bidder_id: transactionData.buyer_id,
        deleted_at: null,
        status: "completed",
      },
    });

    console.log("Auction found:", auction);

    if (!auction) {
      throw new Error("Auction not found or buyer is not the highest bidder");
    }

    const newTransaction = await Transaction.create({
      ...transactionData,
      final_bid_amount: auction.current_highest_bid,
      transaction_date: new Date(),
    });
    return newTransaction;
  } catch (error) {
    console.error("Error initiating transaction:", error);
    throw error;
  }
};

const markAsSuccessful = async (transactionId) => {
  try {
    const [affectedRows] = await Transaction.update(
      { payment_status: "completed" },
      {
        where: { id: transactionId, deleted_at: null },
      }
    );

    if (affectedRows === 0) {
      throw new Error("Transaction not found or unable to mark as successful.");
    }

    const transaction = await getById(transactionId);
    const auction = await auctionRepository.getById(transaction.auction_id);
    if (!auction) {
      throw new Error("Auction not found for the transaction.");
    }
    await auctionRepository.update(auction.id, {
      status: "closed",
    });

    return { message: "Payment successful." };
  } catch (error) {
    console.error(
      `Error marking transaction ${transactionId} as successful:`,
      error
    );
    throw error;
  }
};

const markAsFailed = async (transactionId) => {
  try {
    const [affectedRows] = await Transaction.update(
      { payment_status: "failed" },
      {
        where: { id: transactionId, deleted_at: null },
      }
    );

    if (affectedRows === 0) {
      throw new Error("Transaction not found or unable to mark as failed.");
    }

    return { message: "Payment failed." };
  } catch (error) {
    console.error(
      `Error marking transaction ${transactionId} as failed:`,
      error
    );
    throw error;
  }
};

const transactionRepository = {
  getAll,
  getById,
  initiateTransaction,
  markAsSuccessful,
  markAsFailed,
};

module.exports = transactionRepository;
