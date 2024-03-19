/* eslint-disable no-param-reassign */
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { SchoolClass } = require('../models/class.model');
const { SchoolEmployee } = require('../models/school_employee.model');
const { buildWhereCondition } = require('../utils/FilterSort');
const { ClassUser } = require('../models/class_user.model');
const { SchoolStudents } = require('../models/school_students.model');
const { getSchoolById } = require('./school.service');

// const { User } = require('../models/user.model');
// const { Role } = require('../models/role.model');

/**
 * Get all Classes
 * @param {Object} filter - Sequelize filter
 * @returns {Promise<Classe[]>}
 */
const getAllClasses = async (filter, options) => {
  // lets ensure that this user works in this company
  const { docs, pages, total } = await SchoolClass.paginate({
    where: buildWhereCondition({ ...filter, schoolId: filter.schoolId, isActive: true }),
    ...options,
  });
  return {
    classes: docs,
    pagination: {
      limit: options.paginate,
      page: options.page,
      totalResults: total,
      totalPages: pages,
    },
  };
};

/**
 * Get Classe by id
 * @param {ObjectId} id
 * @returns {Promise<Classe>}
 */
const getClasseById = async (id) => {
  const Classe = await SchoolClass.findOne({
    where: { id, isActive: true },
    include: [
      {
        association: 'school_classes',
        attributes: ['id', 'schoolName'],
      },
      {
        association: 'class_users',
        attributes: ['id'],
        include: [
          {
            association: 'class_teachers',
            attributes: ['id', 'firstname', 'lastname', 'profileImage', 'about'],
          },
          {
            association: 'class_students',
            attributes: ['id', 'firstname', 'lastname', 'profileImage', 'about'],
          },
          {
            association: 'class_captain',
            attributes: ['id', 'firstname', 'lastname', 'profileImage', 'about'],
          },
        ],
      },
    ],
  });
  if (!Classe) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  }
  // lets handle the data processing to reflect our desire ouput
  const processedData = {
    class_students: [],
    class_teachers: [],
    class_captain: null,
  };
  // eslint-disable-next-line no-restricted-syntax
  for (const user of Classe.class_users) {
    if (user.class_students) {
      processedData.class_students.push(user.class_students);
    } else if (user.class_teachers) {
      processedData.class_teachers.push(user.class_teachers);
    } else {
      processedData.class_captain = user.class_captain;
    }
  }
  // remove unnnessary propertirs from the original array
  const formattedOriginalData = Classe.class_users.map((user) => {
    delete user.class_students;
    delete user.class_teachers;
    delete user.class_captain;
    return user;
  });
  return {
    ...formattedOriginalData.dataValues,
    processedData,
  };
};

/**
 * Update Classe by id
 * @param {ObjectId} ClasseId
 * @param {Object} updateBody
 * @returns {Promise<Classe>}
 */
const updateClasseById = async (updateBody, id) => {
  const ClasseExist = await getClasseById(id);
  Object.assign(ClasseExist, updateBody);
  await ClasseExist.save();
  return ClasseExist;
};

/**
 * Delete Classe by id
 * @param {ObjectId} id
 * @returns {Promise<Classe>}
 */
const deleteClasseById = async (id) => {
  const ClasseExist = await getClasseById(id);
  const deleteClasse = await ClasseExist.update({ isActive: false });
  return deleteClasse;
};

/**
 * Assign teacher to a class
 */
const assignTeacher = async (assignBody) => {
  const { schoolId, teacherId, classId } = assignBody;
  const teacherExist = await SchoolEmployee.findOne({ employeeId: teacherId, schoolId });
  if (!teacherExist) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Teacher is not a memeber of your school');
  }
  await getClasseById(classId);
  // check if record already exist
  const isRecordExist = await ClassUser.findOne({ where: { classId, teacherId } });
  if (isRecordExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already assigned in this class as a teacher');
  }
  // assign the teacher
  const teacher = await ClassUser.create({ classId, teacherId });
  return teacher;
};

/**
 * Assign student to a class
 */
const assignAStudent = async (assignBody) => {
  const { schoolId, studentId, classId } = assignBody;
  const studentExist = await SchoolStudents.findOne({ studentId, schoolId });
  if (!studentExist) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student is not a memeber of your school');
  }
  await getClasseById(classId);
  // check if record already exist
  const isRecordExist = await ClassUser.findOne({ where: { classId, studentId } });
  if (isRecordExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already assigned in this class');
  }
  if (isRecordExist.classId !== classId) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      'You cannot assign a particular student to multiple class at the same time, kindly reassign the student to another class'
    );
  }
  // assign the teacher
  const student = await ClassUser.create({ classId, studentId });
  return student;
};

/**
 * Assign teacher to a class
 */
const reAssignTeacher = async (assignBody) => {
  const { teacherId, oldClassId, newClassId } = assignBody;
  // check if record already exist
  const isRecordExist = await ClassUser.findOne({ where: { classId: oldClassId, teacherId } });
  if (!isRecordExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user is not a member of this class');
  }
  await isRecordExist.update({ classId: newClassId });
};
/**
 * Assign teacher to a class
 */
const reAssignStudent = async (assignBody) => {
  const { studentId, oldClassId, newClassId } = assignBody;
  // check if record already exist
  const isRecordExist = await ClassUser.findOne({ where: { classId: oldClassId, studentId } });
  if (!isRecordExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user is already a member of this class');
  }
  await isRecordExist.update({ classId: newClassId });
};

/**
 * Make a student the class captain
 */
const makeCaptain = async (classBody) => {
  const { classCaptainId, classId } = classBody;
  // lets ensure that this student is a memeber of the class
  const getAllClassStudent = await ClassUser.findAll({ where: { classId } });
  // lets ensure that the user is a memeber now
  const studentIds = getAllClassStudent.map((student) => student.studentId);
  if (!studentIds.includes(classCaptainId)) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'This user is not a member of this class');
  }
  // lets ensure that you cannot make a user class captain twice in the same class
  const alreadyCaptain = await ClassUser.findOne({ where: { classCaptainId, classId } });
  if (alreadyCaptain) {
    throw new ApiError(httpStatus.CONFLICT, "You can't be the class captain more than once");
  }
  const uniqueCaptain = await ClassUser.findAll({ where: { classId } });
  const captainIds = uniqueCaptain.map((index) => index.classCaptainId);
  for (let i = 0; i < captainIds.length; i += 1) {
    if (captainIds[i] !== null) {
      throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'two users cannot be captain at the same time');
    }
  }
  return ClassUser.create({ classCaptainId, classId });
};

/**
 * change your class captain
 */
const deleteCaptain = async (classBody) => {
  const { classCaptainId, classId } = classBody;
  // check if record already exist
  const isRecordExist = await ClassUser.findOne({ where: { classId, classCaptainId } });
  if (!isRecordExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This user is not a member of this class');
  }
  return isRecordExist.destroy();
};

const createClass = async (classBody) => {
  await getSchoolById(classBody.schoolId); // validate school exists
  return SchoolClass.create({ ...classBody });
};

module.exports = {
  getAllClasses,
  getClasseById,
  updateClasseById,
  deleteClasseById,
  makeCaptain,
  assignAStudent,
  assignTeacher,
  reAssignStudent,
  reAssignTeacher,
  deleteCaptain,
  createClass,
};
