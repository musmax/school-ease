const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { School } = require('../models/school.model');
const { User } = require('../models/user.model');
const { SchoolStudents } = require('../models/school_students.model');
const { SchoolEmployee } = require('../models/school_employee.model');

/**
 * Get all Schools
 * @param {Object} filter - Sequelize filter
 * @returns {Promise<School[]>}
 */
const getAllSchools = async (filter) => {
  // const user = await User.findByPk(currentUser);
  return School.findAll({
    where: filter,
    include: [
      {
        association: 'school_owner',
        attributes: ['id', 'firstname', 'lastname', 'profileImage', 'about'],
      },
    ],
  });
};

/**
 * Get School by id
 * @param {ObjectId} id
 * @returns {Promise<School>}
 */
const getSchoolById = async (id) => {
  const school = await School.findOne({
    where: { id, isActive: true },
    include: [
      {
        model: User,
        as: 'schoool_students',
        through: SchoolStudents,
        attributes: ['id', 'firstname', 'lastname', 'profileImage', 'about'],
      },
      {
        model: User,
        as: 'school_employees',
        through: SchoolEmployee,
        attributes: ['id', 'firstname', 'lastname', 'profileImage', 'about'],
      },
    ],
  });
  if (!school) {
    throw new ApiError(httpStatus.NOT_FOUND, 'School not found');
  }
  return school;
};

/**
 * Update School by id
 * @param {ObjectId} SchoolId
 * @param {Object} updateBody
 * @returns {Promise<School>}
 */
const updateSchoolById = async (id, updateBody) => {
  const schoolExist = await getSchoolById(id);
  Object.assign(schoolExist, updateBody);
  await schoolExist.save();
  return schoolExist;
};

/**
 * Delete School by id
 * @param {ObjectId} id
 * @returns {Promise<School>}
 */
const deleteSchoolById = async (id) => {
  const schoolExist = await getSchoolById(id);
  const deleteSchool = await schoolExist.update({ isActive: false });
  return deleteSchool;
};

const createSchool = async (schoolBody, createdBy) => {
  return School.create({ ...schoolBody, createdBy });
};

const viewMySchools = async (createdBy) => {
  return School.findAll({ where: { createdBy } });
};

module.exports = {
  getAllSchools,
  getSchoolById,
  updateSchoolById,
  deleteSchoolById,
  createSchool,
  viewMySchools,
};
