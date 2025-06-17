const Bid = require("../models/bids");
const Auction = require("../models/auction");
const User = require("../models/user");
const auctionRepository = require("./auction");
const include = [
  {
    model: Auction,
    as: "auction",
    attributes: ["id", "start_time", "end_time"],
  },
  {
    model: User,
    as: "bidder",
    attributes: ["id", "username"],
  },
];

const getAll = async () => {
  try {
    const bids = await Bid.findAll({
      where: {
        deleted_at: null,
      },
      include: include,
      order: [["bid_time", "DESC"]],
    });
    return bids;
  } catch (error) {
    console.error("Error fetching bids:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const bid = await Bid.findByPk(id, {
      include: include,
    });
    if (!bid) {
      throw new Error("Bid not found");
    }
    return bid;
  } catch (error) {
    console.error(`Error fetching bid with ID ${id}:`, error);
    throw error;
  }
};

const store = async (bidData) => {
  try {
    const auction = await auctionRepository.getById(bidData.auction_id);
    if (auction.status !== "active") {
      throw new Error("Auction is not active");
    }
    if (!auction) {
      throw new Error("Auction not found");
    }

    if (bidData.bid_amount <= auction.starting_bid) {
      throw new Error("Bid amount must be higher than the starting bid");
    }

    const highestBidder = await Bid.findOne({
      where: {
        auction_id: bidData.auction_id,
        deleted_at: null,
      },
      order: [["bid_amount", "DESC"]],
    });

    if (highestBidder && bidData.bid_amount <= highestBidder.bid_amount) {
      throw new Error("Bid amount must be higher than the current highest bid");
    }

    const newBid = await Bid.create({
      ...bidData,
      bid_time: new Date(),
    });

    await auctionRepository.update(bidData.auction_id, {
      current_highest_bid: bidData.bid_amount,
      highest_bidder_id: newBid.bidder_id,
    });

    return newBid;
  } catch (error) {
    console.error("Error creating bid:", error);
    throw error;
  }
};

const update = async (id, bidData) => {
  try {
    const highestBidder = await Bid.findOne({
      where: {
        auction_id: bidData.auction_id,
        status: "active",
        deleted_at: null,
      },
      order: [["bid_amount", "DESC"]],
    });

    if (highestBidder && bidData.bid_amount <= highestBidder.bid_amount) {
      throw new Error("Bid amount must be higher than the current highest bid");
    }

    const [affectedRows] = await Bid.update(bidData, {
      where: { id },
    });

    if (affectedRows === 0) {
      throw new Error("Failed to update bid");
    }

    const updatedBid = await Bid.findByPk(id, {
      include: include,
    });

    if (!updatedBid) {
      throw new Error("Bid not found after update");
    }

    await auctionRepository.update(bidData.auction_id, {
      current_highest_bid: bidData.bid_amount,
      highest_bidder_id: updatedBid.bidder_id,
    });
    return updatedBid;
  } catch (error) {
    console.error(`Error updating bid with ID ${id}:`, error);
    throw error;
  }
};

const retracted = async (id) => {
  try {
    const bid = await Bid.findByPk(id, {
      where: {
        deleted_at: null,
      },
    });

    if (!bid) {
      throw new Error("Bid not found or already retracted");
    }

    await auctionRepository.update(bid.auction_id, {
      current_highest_bid: null,
      highest_bidder_id: null,
    });

    await Bid.destroy({
      where: { id },
    });

    return { message: "Bid retracted successfully" };
  } catch (error) {
    console.error(`Error retracting bid with ID ${id}:`, error);
    throw error;
  }
};

const getByAuctionId = async (auctionId) => {
  try {
    const bids = await Bid.findAll({
      where: {
        auction_id: auctionId,
        deleted_at: null,
      },
      include: include,
      order: [["bid_time", "DESC"]],
    });

    if (!bids || bids.length === 0) {
      throw new Error("No bids found for this auction");
    }

    return bids;
  } catch (error) {
    console.error(`Error fetching bids for auction ID ${auctionId}:`, error);
    throw error;
  }
};

const bidRepository = {
  getAll,
  getById,
  store,
  update,
  getByAuctionId,
  retracted,
};

module.exports = bidRepository;
