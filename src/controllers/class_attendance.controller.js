const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { classAttendanceService } = require('../services');
// const pick = require('../utils/pick');

const markAttendance = catchAsync(async (req, res) => {
  await classAttendanceService.markAttendance(req.body);
  res.status(httpStatus.OK).send({
    success: true,
    message: 'Attendance marked successfully',
    // data: country,
  });
});

module.exports = {
  markAttendance,
};
