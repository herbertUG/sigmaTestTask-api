const { DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define("candidate", {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "First name field cannot be null",
      },
      notEmpty: {
        msg: "Please enter your first name",
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Last name field cannot be null",
      },
      notEmpty: {
        msg: "Please enter your last name",
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notNull: {
        msg: "Email field cannot be null",
      },
      notEmpty: {
        msg: "Please enter your email",
      },
      isEmail:{
        msg: 'Please enter a valid email'
      },
    },
  },
  availability: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  linkedIn: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  gitHub: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "Comment field cannot be null",
      },
      notEmpty: {
        msg: "Comment cannot be empty",
      },
    },
  },
  createdBy: {
    type: DataTypes.INTEGER,
    references: {
        model: 'user',
        key: 'id',
    },
},
},
{
  freezeTableName: true,
  modelName: "candidate",
}
);
