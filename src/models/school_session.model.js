const sequelizePaginate = require('sequelize-paginate');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SchoolSession = sequelize.define('school_session', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  description: {
    type: DataTypes.STRING,
    trim: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

sequelizePaginate.paginate(SchoolSession);

module.exports = { SchoolSession };
