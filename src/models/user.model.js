const validator = require('validator');
const sequelizePaginate = require('sequelize-paginate');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('user', {
  firstname: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  othername: {
    type: DataTypes.STRING,
  },
  position: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  parent_email: {
    type: DataTypes.STRING,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  staff_email: {
    type: DataTypes.STRING,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email');
      }
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
    minlength: 8,
    validate(value) {
      if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        throw new Error('Password must contain at least one letter and one number');
      }
    },
  },
  profileImage: {
    type: DataTypes.STRING,
    trim: true,
  },
  isEmailVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  userType: {
    type: DataTypes.ENUM('admin', 'user'),
    defaultValue: 'user',
  },
  schoolPhoneNumbers: {
    type: DataTypes.JSON,
    trim: true,
  },
  parent_phone_numbers: {
    type: DataTypes.STRING,
    trim: true,
  },
  phone_numbers: {
    type: DataTypes.STRING,
    trim: true,
  },
  parent_name: {
    type: DataTypes.STRING,
    trim: true,
  },
  about: {
    type: DataTypes.STRING,
    trim: true,
  },
  student_school_id: {
    type: DataTypes.STRING,
  },
  lastLogin: {
    type: DataTypes.DATE,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

sequelizePaginate.paginate(User);

module.exports = { User };
