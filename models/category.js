// models/category.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  // Define associations
  Category.associate = function (models) {
    Category.belongsToMany(models.Product, { through: 'ProductCategory', as: 'products' });
  };

  return Category;
};

