const sequelizePaginate = require('sequelize-paginate');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ClassAttendance = sequelize.define('class_attendance', {
  isPresent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dateOfMarking: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

sequelizePaginate.paginate(ClassAttendance);

module.exports = { ClassAttendance };
