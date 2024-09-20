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
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
    },
    categoryIds: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
      defaultValue: [],
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      onUpdate: 'CASCADE',
    },
    buyDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Define associations
  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Product.belongsToMany(models.Category, { through: 'ProductCategory', as: 'categories' });
    Product.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer' }); // New association for buyerId
  };

  return Product;
};
