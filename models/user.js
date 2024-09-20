// models/user.js
'use strict';

// This function defines the User model using Sequelize
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    }},{
      // Ensure timestamps are managed automatically
      timestamps: true,
      tableName: 'Users'  // Make sure the table name matches the one in the database
    });

  return User; // Return the defined User model
};
