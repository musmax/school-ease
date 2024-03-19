const sequelizePaginate = require('sequelize-paginate');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const School = sequelize.define('school', {
  schoolName: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  schoolLogo: {
    type: DataTypes.STRING,
    trim: true,
  },
  numberOfBranches: {
    type: DataTypes.STRING,
    trim: true,
  },
  description: {
    type: DataTypes.STRING,
    trim: true,
  },
  schoolWebsites: {
    type: DataTypes.JSON,
    trim: true,
  },
  OfficialEmail: {
    type: DataTypes.JSON,
    trim: true,
  },
  accredited: {
    type: DataTypes.BOOLEAN,
    trim: true,
  },
  officialHandles: {
    type: DataTypes.JSON,
    trim: true,
  },
  schoolPhoneNumbers: {
    type: DataTypes.JSON,
    trim: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

sequelizePaginate.paginate(School);

module.exports = { School };
