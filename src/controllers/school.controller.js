const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { schoolService } = require('../services');
const pick = require('../utils/pick');

const createSchool = catchAsync(async (req, res) => {
  const Schools = await schoolService.createSchool(req.body, req.user.id);
  res.status(httpStatus.CREATED).send({
    success: true,
    message: 'School created successfully',
    data: Schools,
  });
});
const getSchools = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name']);
  const Schools = await schoolService.getAllSchools(filter, req.user.id);
  res.status(httpStatus.OK).send(Schools);
});

const getSchoolById = catchAsync(async (req, res) => {
  const School = await schoolService.getSchoolById(req.params.id);
  if (!School) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  res.status(httpStatus.OK).send(School);
});

const updateSchoolById = catchAsync(async (req, res) => {
  const School = await schoolService.updateSchoolById(req.params.id, req.body);
  res.status(httpStatus.OK).send(School);
});
const viewMySchools = catchAsync(async (req, res) => {
  const School = await schoolService.viewMySchools(req.user.id);
  res.status(httpStatus.OK).send({
    status: 200,
    message: 'Schools fetched successfully',
    data: School,
  });
});

const deleteSchoolById = catchAsync(async (req, res) => {
  await schoolService.deleteSchoolById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getSchools,
  getSchoolById,
  updateSchoolById,
  deleteSchoolById,
  createSchool,
  viewMySchools,
};
