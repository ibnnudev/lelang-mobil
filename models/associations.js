const Auction = require("./auction");
const Car = require("./car");
const User = require("./user");
const Bid = require("./bids");
const Transaction = require("./transactions");

// auction 1-to-1 car
Auction.belongsTo(Car, {
  foreignKey: "car_id",
  as: "car",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// auction 1-to-1 user (highest bidder)
Auction.belongsTo(User, {
  foreignKey: "highest_bidder_id",
  as: "highest_bidder",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

// car 1-to-many auctions
Car.hasMany(Auction, {
  foreignKey: "car_id",
  as: "auctions",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// user 1-to-many auctions (highest bidder)
User.hasMany(Auction, {
  foreignKey: "highest_bidder_id",
  as: "auctions",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

// user 1-to-many bids
User.hasMany(Bid, {
  foreignKey: "bidder_id",
  as: "bids",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// auction 1-to-many bids
Auction.hasMany(Bid, {
  foreignKey: "auction_id",
  as: "bids",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// bid 1-to-1 auction
Bid.belongsTo(Auction, {
  foreignKey: "auction_id",
  as: "auction",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// bid 1-to-1 user (bidder)
Bid.belongsTo(User, {
  foreignKey: "bidder_id",
  as: "bidder",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// user 1-to-many transactions (buyer)
User.hasMany(Transaction, {
  foreignKey: "buyer_id",
  as: "transactions",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// user 1-to-many transactions (seller)
User.hasMany(Transaction, {
  foreignKey: "seller_id",
  as: "sales",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});

// transaction 1-to-1 auction
Transaction.belongsTo(Auction, {
  foreignKey: "auction_id",
  as: "auction",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// transaction 1-to-1 user (buyer)
Transaction.belongsTo(User, {
  foreignKey: "buyer_id",
  as: "buyer",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

// transaction 1-to-1 user (seller)
Transaction.belongsTo(User, {
  foreignKey: "seller_id",
  as: "seller",
  onDelete: "SET NULL",
  onUpdate: "CASCADE",
});