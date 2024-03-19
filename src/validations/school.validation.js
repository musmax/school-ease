const Joi = require('joi');

const getSchool = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
};

const updateSchool = {
  params: Joi.object().keys({
    id: Joi.number().required(),
  }),
  body: Joi.object().keys({
    schoolName: Joi.string(),
    address: Joi.string(),
    schoolLogo: Joi.string(),
    numberOfBranches: Joi.number(),
    officialHandles: Joi.array().items(Joi.string()),
    schoolPhoneNumbers: Joi.array().items(Joi.string()),
    schoolWebsites: Joi.array().items(Joi.string()),
    officialEmail: Joi.string(),
    accredited: Joi.boolean(),
    description: Joi.string(),
  }),
};

const createSchool = {
  body: Joi.object().keys({
    schoolName: Joi.string().required(),
    address: Joi.string().required(),
    schoolLogo: Joi.string(),
    numberOfBranches: Joi.number(),
    officialHandles: Joi.array().items(Joi.string()),
    schoolPhoneNumbers: Joi.array().items(Joi.string()),
    schoolWebsites: Joi.array().items(Joi.string()),
    officialEmail: Joi.string(),
    accredited: Joi.boolean(),
    description: Joi.string(),
  }),
};

const deleteSchool = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
  getSchool,
  updateSchool,
  deleteSchool,
  createSchool,
};
