'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add the new column 'rentPrice' to the 'Products' table
    await queryInterface.addColumn('Products', 'rentPrice', {
      type: Sequelize.FLOAT,  // Use the FLOAT data type for the rental price
      allowNull: true,  // Allow null values
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the 'rentPrice' column from the 'Products' table
    await queryInterface.removeColumn('Products', 'rentPrice');
  }
};
