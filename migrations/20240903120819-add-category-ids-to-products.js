'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'categoryIds', {
      type: Sequelize.ARRAY(Sequelize.INTEGER),  // Adding an array of integers to store category IDs
      allowNull: false,
      defaultValue: []  // Default to an empty array
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Products', 'categoryIds');
  }
};
