const sequelizePaginate = require('sequelize-paginate');
// const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const SchoolStudents = sequelize.define('school_student', {});

sequelizePaginate.paginate(SchoolStudents);

module.exports = { SchoolStudents };
