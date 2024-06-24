'use strict';
const {
  Model, DataTypes
} = require('sequelize');
const bcypt = require('bcrypt');
const Sequelize = require('../../config/database');

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
        throw new Error('Password confirmation does not match password');
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
