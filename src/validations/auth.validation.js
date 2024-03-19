const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    firstname: Joi.string().required(),
    username: Joi.string().required(),
    phoneNumbers: Joi.array().items(Joi.string()),
    lastname: Joi.string().required(),
    position: Joi.string().required(),
    userType: Joi.string().valid('user', 'admin').default('user'),
    role: Joi.string().valid('school_administrator').default('school_administrator'),
    isEmailVerified: Joi.boolean().default(false),
    schoolObject: Joi.object().keys({
      schoolName: Joi.string().required(),
      address: Joi.string(),
      schoolLogo: Joi.string(),
      schoolWebsites: Joi.array().items(Joi.string()),
      schoolPhoneNumbers: Joi.array().items(Joi.string()),
    }),
  }),
};

const studentRegistration = {
  body: Joi.object().keys({
    school_id: Joi.number().required(),
    class_id: Joi.number().required(),
    role: Joi.string().valid('student').default('student'),
    password: Joi.string().custom(password).default('password'),
    firstname: Joi.string().required(),
    othername: Joi.string().required(),
    username: Joi.string(),
    student_school_id: Joi.string(),
    parent_name: Joi.string(),
    parent_email: Joi.string().required(),
    lastname: Joi.string().required(),
    userType: Joi.string().valid('user', 'admin').default('user'),
    isEmailVerified: Joi.boolean().default(true),
    position: Joi.string().default('student'),
    parent_phone_numbers: Joi.string(),
  }),
};

const registerEmployee = {
  body: Joi.object().keys({
    school_id: Joi.number().required(),
    password: Joi.string().required().custom(password),
    role: Joi.string().valid('staff').default('staff'),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    username: Joi.string(),
    phone_number: Joi.string(),
    othername: Joi.string(),
    userType: Joi.string().valid('user', 'admin').default('user'),
    isEmailVerified: Joi.boolean().default(true),
    position: Joi.string().default('staff'),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string(),
    username: Joi.string(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const sendVerificationEmail = {
  query: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sendVerificationEmail,
  studentRegistration,
  registerEmployee,
};
