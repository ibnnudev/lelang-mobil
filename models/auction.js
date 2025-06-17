const { DataTypes, sequelize } = require("../config/database");

const Auction = sequelize.define(
  "Auction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    car_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "cars",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    starting_bid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    current_highest_bid: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    highest_bidder_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: "users",
        key: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("scheduled", "active", "completed", "closed"),
      allowNull: false,
      defaultValue: "active",
    },
    reserve_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
  },
  {
    tableName: "auctions",
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    paranoid: true,
    indexes: [
      {
        fields: ["car_id", "status"],
      },
      {
        fields: ["start_time"],
      },
      {
        fields: ["end_time"],
      },
    ],
    hooks: {
      beforeCreate: async (auction, options) => {
        const existingAuction = await Auction.findOne({
          where: {
            car_id: auction.car_id,
            status: { [DataTypes.Op.not]: "closed" },
            [DataTypes.Op.or]: [
              {
                start_time: { [DataTypes.Op.lt]: auction.end_time },
                end_time: { [DataTypes.Op.gt]: auction.start_time },
              },
              {
                start_time: { [DataTypes.Op.gte]: auction.start_time },
                end_time: { [DataTypes.Op.lte]: auction.end_time },
              },
            ],
          },
        });
        if (existingAuction) {
          throw new Error("An auction for this car is already scheduled.");
        }
      },
    },
  }
);
module.exports = Auction;
