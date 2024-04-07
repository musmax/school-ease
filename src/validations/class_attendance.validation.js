const Joi = require('joi');

const markAttendance = {
  body: Joi.object().keys({
    teacherId: Joi.number().required(),
    sessionId: Joi.number().required(),
    termId: Joi.number().required(),
    classId: Joi.number().required(),
    dateOfMarking: Joi.date().required(),
    standInMarker: Joi.number(),
    studentRecords: Joi.array()
      .items(
        Joi.object().keys({
          studentId: Joi.number().required(),
          isPresent: Joi.boolean().required(),
        })
      )
      .required(),
  }),
};

const createSession = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    schoolId: Joi.number().required(),
  }),
};

const getSession = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateSession = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
  }),
};
const deactivateSession = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};
const deactivateTerm = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};
const createSessionTerm = {
  body: Joi.object()
    .keys({
      title: Joi.string().required(),
      description: Joi.string(),
      sessionId: Joi.number().required(),
      schoolId: Joi.number().required(),
      startDate: Joi.date().required().less(Joi.ref('endDate')), // Ensure startDate is less than endDate
      endDate: Joi.date().required(),
      schoolBreak: Joi.array().items(
        Joi.object().keys({
          title: Joi.string().required(),
          description: Joi.string().required(),
          date: Joi.date().required(),
        })
      ),
      schoolActivity: Joi.array().items(
        Joi.object().keys({
          title: Joi.string().required(),
          description: Joi.string().required(),
          date: Joi.date().required(),
        })
      ),
    })
    .when(
      Joi.object({
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
      }).unknown(),
      {
        then: Joi.object({
          startDate: Joi.date().required().less(Joi.ref('endDate')), // Ensure startDate is less than endDate
          endDate: Joi.date().required(),
        }),
      }
    ),
};
const getSessionTerm = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};
const updateSessionTerm = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    sessionId: Joi.number(),
    startDate: Joi.date(),
    endDate: Joi.date(),
  }),
};
const createTermActivity = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    termId: Joi.number().required(),
  }),
};
const getTermActivity = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};
const updateTermActivity = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
    termId: Joi.number(),
    status: Joi.string().valid('observed', 'postponed'),
  }),
};
const deleteTermActivity = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const createTermBreak = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.date().required(),
    termId: Joi.number().required(),
  }),
};
const getTermBreak = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};
const updateTermBreak = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    date: Joi.date(),
    termId: Joi.number(),
    status: Joi.string().valid('observed', 'postponed'),
  }),
};
const deleteTermBreak = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  markAttendance,
  createSession,
  updateSession,
  getSession,
  createSessionTerm,
  getSessionTerm,
  updateSessionTerm,
  createTermActivity,
  getTermActivity,
  updateTermActivity,
  deleteTermActivity,
  createTermBreak,
  getTermBreak,
  updateTermBreak,
  deleteTermBreak,
  deactivateSession,
  deactivateTerm,
};
