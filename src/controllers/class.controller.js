const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { classService } = require('../services');
const pick = require('../utils/pick');

const fetchAllClasses = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['schoolId']);
  const options = pick(req.query, ['paginate', 'page']);
  const classes = await classService.getAllClasses(filter, options);
  res.status(httpStatus.OK).send({
    success: true,
    message: ' Classess fetched successfully',
    data: classes,
  });
});

const createClass = catchAsync(async (req, res) => {
  const citys = await classService.createClass(req.body);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Class created successfully',
    data: citys,
  });
});
const getClasseById = catchAsync(async (req, res) => {
  const citys = await classService.getClasseById(req.params.id);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Class fetched successfully',
    data: citys,
  });
});
const updateClasseById = catchAsync(async (req, res) => {
  await classService.updateClasseById(req.body, req.params.id);
  res.status(httpStatus.OK).send({
    success: true,
    message: 'Class Updated successfully',
  });
});
const deleteClasseById = catchAsync(async (req, res) => {
  await classService.deleteClasseById(req.params.id);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Class deleted successfully',
  });
});

const reAssignTeacher = catchAsync(async (req, res) => {
  const citys = await classService.reAssignTeacher(req.body);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Teacher re-assigned successfully',
    data: citys,
  });
});

const assignTeacher = catchAsync(async (req, res) => {
  const citys = await classService.assignTeacher(req.body);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Teacher assigned successfully',
    data: citys,
  });
});
const assignAStudent = catchAsync(async (req, res) => {
  const citys = await classService.assignAStudent(req.body);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Student assigned successfully',
    data: citys,
  });
});
const reAssignStudent = catchAsync(async (req, res) => {
  const citys = await classService.reAssignStudent(req.body);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Student re-assigned successfully',
    data: citys,
  });
});
const makeCaptain = catchAsync(async (req, res) => {
  const citys = await classService.makeCaptain(req.body);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Class Captain chosen successfully',
    data: citys,
  });
});
const deleteCaptain = catchAsync(async (req, res) => {
  const citys = await classService.deleteCaptain(req.body);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'Class Captain deleted successfully',
    data: citys,
  });
});

module.exports = {
  deleteClasseById,
  createClass,
  updateClasseById,
  fetchAllClasses,
  getClasseById,
  reAssignTeacher,
  assignTeacher,
  assignAStudent,
  reAssignStudent,
  makeCaptain,
  deleteCaptain,
};
