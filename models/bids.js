const { DataTypes, sequelize } = require("../config/database");

const Bid = sequelize.define(
  "Bid",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    auction_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "auctions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    bidder_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    bid_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bid_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    created_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updated_at: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "bids",
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
    hooks: {
      beforeCreate: (bid, options) => {
        bid.created_at = new Date();
        bid.updated_at = new Date();
      },
      beforeUpdate: (bid, options) => {
        bid.updated_at = new Date();
      },
    },
  }
);

module.exports = Bid;
