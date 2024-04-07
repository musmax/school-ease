const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { classAttendanceService } = require('../services');
const pick = require('../utils/pick');

const markAttendance = catchAsync(async (req, res) => {
  await classAttendanceService.markAttendance(req.body);
  res.status(httpStatus.OK).send({
    success: true,
    message: 'Attendance marked successfully',
  });
});

const queryClassAttendance = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['startDate', 'endDate', 'classId', 'studentId', 'teacherId', 'schoolId']);
  const options = pick(req.query, ['paginate', 'page']);
  const result = await classAttendanceService.queryClassAttendance(filter, options);
  res.send({
    success: true,
    message: 'Subscription history fetched succesfully',
    data: result,
  });
});

const getAttendance = catchAsync(async (req, res) => {
  const result = await classAttendanceService.getAttendance(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'attendance fetch successfully',
    data: result,
  });
});

const updateAttendance = catchAsync(async (req, res) => {
  await classAttendanceService.updateAttendance(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'attendance updated successfully',
  });
});
const createSession = catchAsync(async (req, res) => {
  const data = await classAttendanceService.createSession(req.body);
  res.status(httpStatus.OK).send({
    success: true,
    message: 'School sessions created successfully',
    data,
  });
});
const querySchoolSession = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['schoolId', 'title', 'isActive']);
  const options = pick(req.query, ['paginate', 'page']);
  const result = await classAttendanceService.querySchoolSession(filter, options);
  res.send({
    success: true,
    message: 'School sessions fetched successfully',
    data: result,
  });
});

const getSession = catchAsync(async (req, res) => {
  const result = await classAttendanceService.getSession(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session fetched successfully',
    data: result,
  });
});

const updateSession = catchAsync(async (req, res) => {
  await classAttendanceService.updateSession(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session updated successfully',
  });
});
const deactivateSession = catchAsync(async (req, res) => {
  await classAttendanceService.deactivateSession(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session updated successfully',
  });
});
const createSessionTerm = catchAsync(async (req, res) => {
  await classAttendanceService.createSessionTerm(req.body);
  res.status(httpStatus.OK).send({
    success: true,
    message: 'School session term created successfully',
  });
});

const querySessionTerm = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['sessionId', 'title', 'startDate', 'endDate', 'isActive']);
  const options = pick(req.query, ['paginate', 'page']);
  const result = await classAttendanceService.querySessionTerm(filter, options);
  res.send({
    success: true,
    message: 'School session terms fetched successfully',
    data: result,
  });
});

const fetchtermById = catchAsync(async (req, res) => {
  const result = await classAttendanceService.fetchtermById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session terms fetched successfully',
    data: result,
  });
});

const updateSessionTerm = catchAsync(async (req, res) => {
  await classAttendanceService.updateSessionTerm(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session terms updated successfully',
  });
});
const deactivateTerm = catchAsync(async (req, res) => {
  await classAttendanceService.deactivateTerm(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session terms deactivated successfully',
  });
});
const createTermActivity = catchAsync(async (req, res) => {
  await classAttendanceService.createTermActivity(req.body);
  res.status(httpStatus.OK).send({
    success: true,
    message: 'School session term activity created successfully',
  });
});

const querySchoolTermActivity = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['sessionId']);
  const options = pick(req.query, ['paginate', 'page']);
  const result = await classAttendanceService.querySchoolTermActivity(filter, options);
  res.send({
    success: true,
    message: 'School session term activities fetched successfully',
    data: result,
  });
});

const getTermActivity = catchAsync(async (req, res) => {
  const result = await classAttendanceService.getTermActivity(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session term activity fetched successfully',
    data: result,
  });
});

const updateTermActivity = catchAsync(async (req, res) => {
  await classAttendanceService.updateTermActivity(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session term activity updated successfully',
  });
});
const deleteTermActivity = catchAsync(async (req, res) => {
  await classAttendanceService.deleteTermActivity(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session terms deleted successfully',
  });
});
const createTermBreak = catchAsync(async (req, res) => {
  await classAttendanceService.createTermBreak(req.body);
  res.status(httpStatus.OK).send({
    success: true,
    message: 'School session term break created successfully',
  });
});

const querySchoolTermBreak = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['termId']);
  const options = pick(req.query, ['paginate', 'page']);
  const result = await classAttendanceService.querySchoolTermBreak(filter, options);
  res.send({
    success: true,
    message: 'School session term terms fetched successfully',
    data: result,
  });
});

const getTermBreak = catchAsync(async (req, res) => {
  const result = await classAttendanceService.getTermBreak(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session term activity fetched successfully',
    data: result,
  });
});

const updateTermBreak = catchAsync(async (req, res) => {
  await classAttendanceService.updateTermBreak(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session term break updated successfully',
  });
});
const deleteTermBreak = catchAsync(async (req, res) => {
  await classAttendanceService.deleteTermBreak(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: 'School session term break deleted successfully',
  });
});

module.exports = {
  markAttendance,
  queryClassAttendance,
  getAttendance,
  updateAttendance,
  createSession,
  updateSession,
  getSession,
  createSessionTerm,
  fetchtermById,
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
  querySchoolSession,
  querySessionTerm,
  querySchoolTermActivity,
  querySchoolTermBreak,
};
