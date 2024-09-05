'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // No changes needed on 'up' since we are dropping tables
  },

  down: async (queryInterface, Sequelize) => {
    // Drop Product and Category tables
    await queryInterface.dropTable('Products');
    await queryInterface.dropTable('Categories');
    await queryInterface.dropTable('ProductCategories');
  },
};
