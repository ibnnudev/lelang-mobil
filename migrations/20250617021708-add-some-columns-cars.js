"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("cars", "mileage", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("cars", "vin", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    await queryInterface.addColumn("cars", "description", {
      type: Sequelize.TEXT,
      allowNull: true,
    });

    await queryInterface.addColumn("cars", "image_url", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.addColumn("cars", "status", {
      type: Sequelize.ENUM("available", "sold", "pending"),
      allowNull: false,
      defaultValue: "available",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("cars", "status");
    await queryInterface.removeColumn("cars", "image_url");
    await queryInterface.removeColumn("cars", "description");
    await queryInterface.removeColumn("cars", "vin");
    await queryInterface.removeColumn("cars", "mileage");
  },
};
