'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        unique: true,
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
        type: Sequelize.STRING,
        validate: {
          notNull:{
            msg: 'Please enter your password'
          },
          notEmpty:{
            msg: 'Password name cannot be empty'
          },
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user');
  }
};