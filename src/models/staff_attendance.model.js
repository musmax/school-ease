const sequelizePaginate = require('sequelize-paginate');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const StaffAttendance = sequelize.define('staff_attendance', {
  isPresent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  dateOfMarking: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  arrivalTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

sequelizePaginate.paginate(StaffAttendance);

module.exports = { StaffAttendance };
