const Joi = require("joi");

const createCompany = {
  body: Joi.object().keys({
    Code: Joi.string().required(),
    Name: Joi.string().required(),
    Address: Joi.string().required(),
    City: Joi.string().required(),
    State: Joi.string().required(),
    Country: Joi.string().required(),
    PinCode: Joi.string().required(),
    LicenseNo: Joi.string().required(),
    CompanyType: Joi.number().required(),
  }),
};

const updateCompany = {
  body: Joi.object().keys({
    Code: Joi.string().required(),
    Name: Joi.string().required(),
    Address: Joi.string().required(),
    City: Joi.string().required(),
    State: Joi.string().required(),
    Country: Joi.string().required(),
    PinCode: Joi.string().required(),
    LicenseNo: Joi.string().required(),
    CompanyType: Joi.number().required(),
  }),
};

const listCompany = {
  body: Joi.object().keys({
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const listCompanyByCode = {
  params: Joi.object().keys({
    Code: Joi.string().required(),
  }),
};

const deleteCompany = {
  params: Joi.object().keys({
    Code: Joi.string().required(),
  }),
};

module.exports = {
  createCompany,
  updateCompany,
  listCompany,
  listCompanyByCode,
  deleteCompany,
};
