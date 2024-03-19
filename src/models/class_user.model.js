const sequelizePaginate = require('sequelize-paginate');
// const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ClassUser = sequelize.define('class_user', {});

sequelizePaginate.paginate(ClassUser);

module.exports = { ClassUser };
