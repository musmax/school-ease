const sequelizePaginate = require('sequelize-paginate');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SchoolSessionTerm = sequelize.define('school_session_term', {
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
    defaultValue: true,
  },
  startDate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  endDate: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

sequelizePaginate.paginate(SchoolSessionTerm);

module.exports = { SchoolSessionTerm };
