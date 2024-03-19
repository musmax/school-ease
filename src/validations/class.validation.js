const Joi = require('joi');

const createClass = {
  body: Joi.object().keys({
    schoolId: Joi.number().required(),
    name: Joi.string().required(),
    description: Joi.string(),
  }),
};
const assignTeacher = {
  body: Joi.object().keys({
    teacherId: Joi.number().required(),
    classId: Joi.number().required(),
  }),
};

const assignStudent = {
  body: Joi.object().keys({
    studentId: Joi.number().required(),
    classId: Joi.number().required(),
  }),
};
const reassignTeacher = {
  body: Joi.object().keys({
    teacherId: Joi.number().required(),
    oldClassId: Joi.number().required(),
    newClassId: Joi.number().required(),
  }),
};
const reAssignStudent = {
  body: Joi.object().keys({
    studentId: Joi.number().required(),
    oldClassId: Joi.number().required(),
    newClassId: Joi.number().required(),
  }),
};

const makeCaptain = {
  body: Joi.object().keys({
    classCaptainId: Joi.number().required(),
    classId: Joi.number().required(),
  }),
};

module.exports = {
  createClass,
  assignStudent,
  assignTeacher,
  makeCaptain,
  reAssignStudent,
  reassignTeacher,
};
