const Auction = require("./auction");
const Car = require("./car");
const User = require("./user");

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
