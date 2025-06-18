const { sequelize, DataTypes } = require("../config/database");
const CarImages = sequelize.define("CarImages", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  car_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "cars",
      key: "id",
    },
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
  public_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  is_thumbnail: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  created_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
});

module.exports = CarImages;
