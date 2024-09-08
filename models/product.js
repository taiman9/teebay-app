// models/product.js
'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    rentPrice: {
      type: DataTypes.FLOAT,  // Set the type to FLOAT
      allowNull: true,  // Allow null values
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
  });

  // Define associations
  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Product.belongsToMany(models.Category, { through: 'ProductCategory', as: 'categories' });
  };

  return Product;
};
