const Joi = require('joi');

const markAttendance = {
  body: Joi.object().keys({
    teacherId: Joi.number().required(),
    classId: Joi.number().required(),
    dateOfMarking: Joi.date().required(),
    standInMarker: Joi.number(),
    studentRecords: Joi.array().items(
      Joi.object().keys({
        studentId: Joi.number(),
        isPresent: Joi.boolean().required(),
      })
    ),
  }),
};

module.exports = { markAttendance };
