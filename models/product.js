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
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Allow null values initially
      references: {
        model: 'Users',  // Reference to the Users table
        key: 'id',
      },
      onUpdate: 'CASCADE',  // Update on cascade
    },
    buyDate: {
      type: DataTypes.DATE,
      allowNull: true, // Allow null values initially
    },
  });

  // Define associations
  Product.associate = function (models) {
    Product.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Product.belongsToMany(models.Category, { through: 'ProductCategory', as: 'categories' });

    // Adding association for buyerId
    Product.belongsTo(models.User, { foreignKey: 'buyerId', as: 'buyer' }); // New association for buyerId
  };

  return Product;
};
