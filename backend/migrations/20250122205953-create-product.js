'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: true
      },
      percentage: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true
      },
      manufacturerId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Manufacturers",
          key: "id",
        },
        allowNull: false,
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};