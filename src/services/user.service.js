const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const ApiError = require('../utils/ApiError');
const { User } = require('../models/user.model');
const { School } = require('../models/school.model');
// const { SchoolEmployee } = require('../models/school_employee.model');
const { Role } = require('../models/role.model');
const { Permission } = require('../models/permission.model');
const logger = require('../config/logger');
const { sendEmail } = require('./email.service');
const { getMessageTemplateByTitle, convertTemplateToMessage } = require('./message_template.service');
const config = require('../config/config');
const { deleteUploadedFile } = require('./upload.service');
const { ClassUser } = require('../models/class_user.model');
const validateFile = require('../utils/SheetValidator');
const validateFile2 = require('../utils/SheetValidator2 ');
const { getSchoolById } = require('./school.service');
const { getClasseById } = require('./class.service');

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
const isEmailTaken = async function (email) {
  const user = await User.findOne({ where: { email } });
  return !!user;
};

/**
 * Check if username is taken
 * @param {string} username
 * @returns {Promise<boolean>}
 */
const isUsernameTaken = async function (username, userId = null) {
  const user = await User.findOne({
    where: {
      username,
      // if userId is passed in, then check for username except the user with userId
      ...(userId && { id: { [Op.ne]: userId } }),
    },
  });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
const isPasswordMatch = async function (password, user) {
  const comp = bcrypt.compareSync(password, user.password);
  logger.info(comp);
  return comp;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findByPk(id, {
    attributes: { exclude: ['password'] },
    include: [
      {
        association: 'school_owner',
      },
      {
        association: 'class_students',
        attributes: ['id'],
        include: [
          {
            association: 'class_users',
            attributes: ['name'],
          },
        ],
      },
      {
        association: 'class_teachers',
        attributes: ['id'],
        include: [
          {
            association: 'class_users',
            attributes: ['name'],
          },
        ],
      },
      {
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] },
        include: [
          {
            model: Permission,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
          },
        ],
      },
      {
        association: 'student_attendance',
      },
    ],
  });
};
const sendUserWelcomeEmail = async (user) => {
  // get user email and first name
  const { email, firstName } = user.dataValues;
  // get message template
  const {
    dataValues: { emailSubject, emailBody },
  } = await getMessageTemplateByTitle('Welcome_Email');

  const text = await convertTemplateToMessage(emailBody, {
    firstName,
  });

  await sendEmail(email, emailSubject, text);
};

/**
 * Create a user
 * @param {Object} userBody
 * @param {string} userBody.email
 * @param {string} userBody.password
 * @param {string} userBody.firstName
 * @param {string} userBody.lastName
 * @param {string} userBody.username
 * @param {string} userBody.userType
 * @param {number[]} userBody.role
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // console.log(userBody);
  const { userType, role, schoolObject, ...userProfile } = userBody;
  // Check if email is taken
  if (await isEmailTaken(userProfile.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // Check if username is taken
  if (await isUsernameTaken(userProfile.username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  // Get the user role
  const foundRole = await Role.findAll({
    where: {
      id: role,
    },
  });
  userProfile.password = bcrypt.hashSync(userProfile.password, 8);
  // Create the user within the Transaction
  const user = await User.create(userProfile);
  // Set the user role within the transaction
  await user.setRoles(foundRole);
  if (schoolObject) {
    const school = await School.create({ ...schoolObject, createdBy: user.id });
    // make the principal employee of his own company
    await user.setSchool_employees(school.id);
  }
  // Return user object with role
  return getUserById(user.id);
};

/**
 * Lets create student in bulk
 * @param {*} userBody
 * @returns
 */
const generateUniqueUsername = (firstName, lastName) => {
  // Function to generate a random four-digit number
  const generateRandomNumber = () => Math.floor(1000 + Math.random() * 9000);
  return `${firstName.charAt(0)}${lastName.charAt(0)}-${generateRandomNumber()}`;
};
const generateUniqueEmail = (firstname, lastname, othername) => {
  // Function to generate a random four-digit number
  return `${firstname}${lastname}${othername}@gmail.com`;
};
const studentRegistration = async (userBody) => {
  // eslint-disable-next-line camelcase
  const { userType, role, class_id, school_id, ...userProfile } = userBody;
  const defaultPassword = 'password';
  await getSchoolById(school_id); // Check that the school exists
  await getClasseById(class_id); // Check
  const email = generateUniqueEmail(userBody.firstname, userBody.lastname, userBody.otherName);
  const username = generateUniqueUsername(userBody.firstname, userBody.lastname);
  // Check if email is taken
  if (await isEmailTaken(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  // Check if username is taken
  if (await isUsernameTaken(username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  // Get the user role
  // const foundRole = await Role.findAll({
  //   where: {
  //     id: role,
  //   },
  // });
  userProfile.password = bcrypt.hashSync(defaultPassword, 8);
  // Create the user within the Transaction
  const user = await User.create({ ...userProfile, email, username, isEmailVerified: true });
  // eslint-disable-next-line radix
  // const parseSchholId = parseInt(school_id);

  await user.setSchoool_students(school_id);
  // Set the user role
  // await user.setRoles(foundRole);
  // set the users to their class
  await ClassUser.create({ studentId: user.id, classId: class_id });
  // Set the user role within the transaction
  // await user.setRoles(foundRole);

  // Return user object with role
  return getUserById(user.id);
};
const employeeRegistration = async (userBody) => {
  const defaultPassword = 'password';
  // eslint-disable-next-line camelcase
  const { userType, school_id, ...userProfile } = userBody;
  await getSchoolById(school_id); // Check that the school exists
  const email = generateUniqueEmail(userBody.firstname, userBody.lastname, userBody.othername);
  const username = generateUniqueUsername(userBody.firstname, userBody.lastname);
  // Check if email is taken
  if (await isEmailTaken(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // Check if username is taken
  if (await isUsernameTaken(username)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }
  // Get the user role
  // const foundRole = await Role.findAll({
  //   where: {
  //     id: role,
  //   },
  // });
  userProfile.password = bcrypt.hashSync(defaultPassword, 8);
  // Create the user within the Transaction
  const user = await User.create({ ...userProfile, email, username, isEmailVerified: true });
  // eslint-disable-next-line radix
  await user.setSchool_employees(school_id);
  // Set the user role
  // await user.setRoles(foundRole);
  // Return user object with role
  return getUserById(user.id);
};

/**
 * creating students in bulk
 */
const createManyStudents = async (file) => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'You must upload a csv file to continue this action');
  }
  const uploadedFile = await validateFile(file);
  const successResults = [];
  const errorResults = [];
  await Promise.all(
    uploadedFile.map(async (user) => {
      try {
        const role = await Role.findOne({ where: { name: 'student' } });
        const createdUser = await studentRegistration(user); // Call employeeRegistration to handle role setting
        await createdUser.setRoles(role.id);
        successResults.push(createdUser);
      } catch (error) {
        // Log the error
        // eslint-disable-next-line no-console
        console.error('Error creating student:', error);
        // Push error details to errorResults array
        errorResults.push({ user, error: error.message });
      }
    })
  );

  // If there are errors, throw them to be captured by the error handling middleware
  if (errorResults.length > 0) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Error creating students', { errors: errorResults });
  }

  return {
    message: 'Multiple users created successfully',
    status: 200,
    // successResults,
  };
};

/**
 * creating students in bulk
 */
const createManyEmployee = async (file) => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'You must upload a CSV file to continue');
  }
  const uploadedFile = await validateFile2(file);
  // Validate school IDs and handle missing schools (as discussed previously)
  const userResults = await Promise.all(
    uploadedFile.map(async (user) => {
      try {
        const existingUser = await User.findOne({
          where: { email: user.staff_email }, // Check using email (assuming unique)
        });
        if (existingUser) {
          // User already exists, return details
          return { existingUser, message: 'User already exists' };
        }
        // New user, create and set role
        const role = await Role.findOne({ where: { name: 'staff' } });
        const createdUser = await employeeRegistration(user);
        await createdUser.setRoles(role.id);
        return createdUser; // Return the created user object
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error creating employee:', error);
        // Handle other errors (e.g., database errors)
        return { error }; // Return an error object for logging or handling
      }
    })
  );

  // Organize results: existing users, created users, and errors
  const existingUsers = userResults.filter((result) => result.existingUser);
  const createdUsers = userResults.filter((result) => result.createdUser);
  const errors = userResults.filter((result) => result.error);
  // ... (return details about created and existing users, handle errors)
  return {
    existingUsers,
    createdUsers,
    errors: errors.length > 0 ? errors : null, // Return errors if any
    message: 'Employee creation completed',
  };
};

/**
 * Query for users
 * @param {Object} filter - filter
 * @param {Object} options - Query options
 * @param {number} [filter.firstName] - filter firstname
 * @param {number} [current.limit] - Maximum number of results per page (default = 25)
 * @param {number} [current.page] - The row to start from (default = 0)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, current) => {
  // get user and include their roles
  const options = {
    attributes: { exclude: ['password'] },
    page: current.page, // Default 1
    paginate: current.limit, // Default 25
    where: {
      firstName: {
        [Op.like]: `%${filter.firstName || ''}%`,
        [Op.like]: `%${filter.lastName || ''}%`,
        [Op.like]: `%${filter.username || ''}%`,
      },
      isDeleted: false, // only get users that are not deleted
    },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] },
        include: [
          {
            model: Permission,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
          },
        ],
      },
    ],
  };
  const { docs, pages, total } = await User.paginate(options);
  return { users: docs, limit: options.paginate, totalPages: pages, totalResults: total };
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] },
        include: [
          {
            model: Permission,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
          },
        ],
      },
    ],
  });
};

/**
 * Get user by email or username
 * @param {Object} emailOrUsername
 * @param {string} emailOrUsername.email - optional
 * @param {string} emailOrUsername.username - optional
 * @returns {Promise<User>}
 */
const getUserByEmailOrUsername = async (emailOrUsername) => {
  return User.findOne({
    where: {
      ...emailOrUsername,
    },
    include: [
      {
        model: Role,
        as: 'roles',
        attributes: ['name'],
        through: { attributes: [] },
        include: [
          {
            model: Permission,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            through: { attributes: [] },
          },
        ],
      },
    ],
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @param {Object} currentUser
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const { role, countryId, languageIds, ...userProfile } = updateBody;
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (userProfile.email && userProfile.email !== user.email && (await isEmailTaken(userProfile.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }

  // check if username is taken
  if (
    userProfile.username &&
    userProfile.username !== user.username &&
    (await isUsernameTaken(userProfile.username, userId))
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
  }

  // if password is updated, hash it
  if (userProfile.password) {
    // eslint-disable-next-line no-param-reassign
    userProfile.password = bcrypt.hashSync(userProfile.password, 8);
  }

  // if profile image is updated, delete the old one
  if (userProfile.profileImage !== user.profileImage) {
    await deleteUploadedFile(user.profileImage);
  }

  // if role is updated, get the role
  if (role) {
    // get the new role
    const userRole = await Role.findAll({ where: { id: role.map((r) => r) } });

    // confirm the role passed is valid
    if (userRole.length !== role.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid role');
    }

    // remove existing role
    await user.removeRoles();
    // set the new role
    await user.setRoles(userRole);
  }

  Object.assign(user, { ...userProfile, countryId });
  await user.save();
  return getUserById(userId);
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  await user.update({ isDeleted: 'true' });
  return user;
};

/**
 * Update user password
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @param {String} updateBody.oldPassword
 * @param {String} updateBody.newPassword
 * @returns {Promise<User>}
 */
const updateUserPassword = async (userId, updateBody) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!(await isPasswordMatch(updateBody.oldPassword, user.dataValues))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Incorrect password');
  }

  // eslint-disable-next-line no-param-reassign
  updateBody.password = bcrypt.hashSync(updateBody.newPassword, 8);

  Object.assign(user, updateBody);
  await user.save();

  return {
    success: true,
    message: 'Password updated successfully',
  };
};

/**
 * Encrypt user data
 * @param {Object} userData
 * @returns {Promise<string>}
 */
const encryptData = async (userData) => {
  const encryptedData = await jwt.sign(userData, config.jwt.secret);
  // append secret and delimiter
  return encryptedData + config.userSecret;
};

/**
 * Assign a new Role to an existing user by updating the existing one
 * @param {number} userId
 * @param {number} roleId
 * @returns {Promise<Object>}
 */
const removeANewRoleForAnExistingUser = async (userBody) => {
  const { userId, roleId } = userBody;
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  // Add the new role to the user
  await user.removeRoles(role);
};

/**
 * Assign a new role to an existing user
 */
const addRoleToUser = async (userId, roleId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const role = await Role.findByPk(roleId);
  if (!role) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Role not found');
  }
  // Check if the user already has the specified role
  const existingRoles = await user.getRoles({ where: { id: roleId } });
  if (existingRoles.length === 0) {
    // User doesn't have the role, add it
    await user.addRole(role);
  } else {
    // User already has the role, you can handle it as needed
    throw new ApiError(httpStatus.BAD_REQUEST, 'User already has the specified role');
  }

  // Now the user has the new role
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  updateUserById,
  deleteUserById,
  isPasswordMatch,
  getUserByEmailOrUsername,
  isEmailTaken,
  isUsernameTaken,
  encryptData,
  updateUserPassword,
  sendUserWelcomeEmail,
  studentRegistration,
  employeeRegistration,
  addRoleToUser,
  removeANewRoleForAnExistingUser,
  createManyStudents,
  createManyEmployee,
};
