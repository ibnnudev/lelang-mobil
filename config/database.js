const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ [Database] Connection established successfully!");
    await sequelize.sync({ alter: true });
    console.log("✅ [Database] Synchronized successfully!");
  } catch (error) {
    console.error("❌ [Database] Unable to connect:", error.message);
    process.exit(1);
  }
};

module.exports = {
  sequelize,
  connectDB,
  DataTypes,
};
