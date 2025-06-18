"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("car_images", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      car_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "cars",
          key: "id",
        },
      },
      image_url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      public_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_thumbnail: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("car_images");
  },
};
