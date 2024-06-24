'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const bcypt = require('bcrypt');
const Sequelize = require('../../config/database');
const AppError = require('../../utils/appError');

module.exports = Sequelize.define('user', {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  firstName: {
    type: DataTypes.STRING
  },
  lastName: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
      if (value !== this.password) {
        throw new AppError('Password and confirm password do not match', 400);
      } else {
        const hashedPassword = bcypt.hashSync(value, 10);
        this.setDataValue('password ', hashedPassword);
      }
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}, {
 freezeTableName: true,
 modelName: 'user',
});
