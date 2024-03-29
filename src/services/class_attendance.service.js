const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
// const { Country } = require('../models/country.model');
// const { buildWhereCondition } = require('../utils/FilterSort');

const { ClassUser } = require('../models/class_user.model');
const { ClassAttendance } = require('../models/attendance.model');

/**
 * @typedef {Object} AttendanceObject
 * @property {string} dateOfMarking - .the day of the attendance marking
 * @property {number} teacherId - .the class teacher
 * @property {number} studentId - .the student of the class
 * @property {number} classId - .the class the attendance is meant for
 * @property {string} isPresent - .the flag indicating if a student is absent or present
 * @property {string} standInMarker - .another employee of the school that can mark attendance for the class
 */

/**
 * Instantiate a new company
 * @param {Object} AttendanceBody
 * @param {number} AttendanceBody.teacherId
 * @param {number} AttendanceBody.studentId
 * @param {number} AttendanceBody.classId
 * @param {date} AttendanceBody.dateOfMarking
 * @returns {Promise<CompanyObject>}
 */
const markAttendance = async (AttendanceBody) => {
  const { dateOfMarking, studentRecords, teacherId, classId } = AttendanceBody;

  // Ensure that the class teacher is assigned to this class
  const validateTeacher = await ClassUser.findOne({ where: { classId, teacherId } });
  if (!validateTeacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'This teacher is not assigned to this class');
  }

  // Map through student records to create the attendance records
  const promisesArray = studentRecords.map(async (record) => {
    // Create the attendance
    await ClassAttendance.create({
      dateOfMarking,
      teacherId,
      classId,
      studentId: record.studentId,
      isPresent: record.isPresent,
    });
  });

  return Promise.all(promisesArray);
};

module.exports = {
  markAttendance,
};
