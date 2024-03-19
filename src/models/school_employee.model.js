const sequelizePaginate = require('sequelize-paginate');
const { sequelize } = require('../config/database');

const SchoolEmployee = sequelize.define('school_employee', {});

sequelizePaginate.paginate(SchoolEmployee);

module.exports = { SchoolEmployee };
