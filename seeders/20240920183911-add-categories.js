'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'ELECTRONICS', createdAt: new Date(), updatedAt: new Date() },
      { name: 'FURNITURE', createdAt: new Date(), updatedAt: new Date() },
      { name: 'HOME APPLIANCES', createdAt: new Date(), updatedAt: new Date() },
      { name: 'SPORTING GOODS', createdAt: new Date(), updatedAt: new Date() },
      { name: 'OUTDOOR', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
