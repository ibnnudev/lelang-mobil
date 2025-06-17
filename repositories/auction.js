const Auction = require("../models/auction");
const Car = require("../models/car");
const User = require("../models/user");

const include = [
  {
    model: Car,
    as: "car",
    attributes: ["id", "name", "make", "year", "vin"],
  },
  {
    model: User,
    as: "highest_bidder",
    attributes: ["id", "username"],
  },
];

const getAll = async () => {
  try {
    const auctions = await Auction.findAll({
      order: [["start_time", "ASC"]],
      include: include,
    });
    return auctions;
  } catch (error) {
    console.error("Error fetching auctions:", error);
    throw error;
  }
};

const getById = async (id) => {
  try {
    const auction = await Auction.findByPk(id, {
      include: include,
    });
    if (!auction) {
      throw new Error("Auction not found");
    }
    return auction;
  } catch (error) {
    console.error(`Error fetching auction with ID ${id}:`, error);
    throw error;
  }
};

const store = async (auctionData) => {
  try {
    const auction = await Auction.create(auctionData);
    if (!auction) {
      throw new Error("Failed to create auction");
    }
    const createdAuction = await Auction.findByPk(auction.id, {
      include: include,
    });

    if (!createdAuction) {
      throw new Error("Auction not found after creation");
    }

    return createdAuction;
  } catch (error) {
    console.error("Error creating auction:", error);
    throw error;
  }
};

const update = async (id, auctionData) => {
  try {
    const [affectedRows] = await Auction.update(auctionData, {
      where: { id },
    });
    if (affectedRows === 0) {
      throw new Error("Auction not found or no changes made");
    }
    const updatedAuction = await Auction.findByPk(id, {
      include: include,
    });
    if (!updatedAuction) {
      throw new Error("Auction not found after update");
    }
    return updatedAuction;
  } catch (error) {
    console.error(`Error updating auction with ID ${id}:`, error);
    throw error;
  }
};

const destroy = async (id) => {
  try {
    const auction = await Auction.destroy({
      where: { id },
    });
    if (!auction) {
      throw new Error("Auction not found");
    }
    return { message: "Auction deleted successfully" };
  } catch (error) {
    console.error(`Error deleting auction with ID ${id}:`, error);
    throw error;
  }
};

const getWithFilters = async (filters) => {
  try {
    const whereClause = {};
    if (filters.status) {
      whereClause.status = filters.status;
    }
    if (filters.start_time) {
      whereClause.start_time = filters.start_time;
    }
    if (filters.end_time) {
      whereClause.end_time = filters.end_time;
    }

    const auctions = await Auction.findAll({
      where: whereClause,
      include: include,
      order: [["start_time", "ASC"]],
    });

    return auctions;
  } catch (error) {
    console.error("Error fetching auctions with filters:", error);
    throw error;
  }
};

const auctionRepository = {
  getAll,
  getById,
  store,
  update,
  destroy,
  getWithFilters,
};

module.exports = auctionRepository;
