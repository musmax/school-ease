const sequelizePaginate = require('sequelize-paginate');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SchoolTermBreak = sequelize.define('school_term_break', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('observed', 'postponed'),
  },
});

sequelizePaginate.paginate(SchoolTermBreak);

module.exports = { SchoolTermBreak };
