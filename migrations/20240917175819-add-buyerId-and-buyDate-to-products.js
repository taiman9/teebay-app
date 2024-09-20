'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Products', 'buyerId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Allow null initially if the product has not been bought
      onUpdate: 'CASCADE', // Update on cascade
    });
    
    await queryInterface.addColumn('Products', 'buyDate', {
      type: Sequelize.DATE,
      allowNull: true, // Allow null initially if the product has not been bought
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the columns in the down method
    await queryInterface.removeColumn('Products', 'buyerId');
    await queryInterface.removeColumn('Products', 'buyDate');
  }
};
