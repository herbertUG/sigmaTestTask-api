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
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
      notNull:{
        msg: 'Please enter your first name'
      },
      notEmpty:{
        msg: 'First name cannot be empty'
      },
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
      notNull:{
        msg: 'Please enter your last name'
      },
      notEmpty:{
        msg: 'Last name cannot be empty'
      },
    }
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull:false,
    validate: {
      notNull:{
        msg: 'Please enter your email'
      },
      notEmpty:{
        msg: 'Email cannot be empty'
      },
      isEmail:{
        msg: 'Please enter a valid email'
      },
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false,
    validate: {
      notNull:{
        msg: 'Please enter your password'
      },
      notEmpty:{
        msg: 'Password name cannot be empty'
      },
    }
  },
  confirmPassword: {
    type: DataTypes.VIRTUAL,
    set(value) {
        if (this.password.length < 6) {
          throw new AppError('Password must be at least 6 characters', 400);
        }
        if (value === this.password) {
            const hashPassword = bcypt.hashSync(value, 10);
            this.setDataValue('password', hashPassword);
        } else {
          throw new AppError('Password and confirm password do not match', 400);
        }
    },
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
