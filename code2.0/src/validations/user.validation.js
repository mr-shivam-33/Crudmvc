const Joi = require("joi");
const { password, objectId } = require("./custom.validation");

const createUser = {
  body: Joi.object().keys({
    Email: Joi.string().required().email(),
    Password: Joi.string().required().custom(password),
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    EmployeeCode: Joi.string().required(),
    Mobile: Joi.string().required(),
    UserRole: Joi.string().required(),
    UserName: Joi.string().required(),
    PlantCode: Joi.string().required(),
  }),
};

const getUsers = {
  body: Joi.object().keys({
    PlantCode: Joi.string(),
    UserRole: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      Email: Joi.string().required().email(),
      Password: Joi.string().required().custom(password),
      FirstName: Joi.string().required(),
      LastName: Joi.string().required(),
      EmployeeCode: Joi.string().required(),
      Mobile: Joi.string().required(),
      UserRole: Joi.string().required(),
      UserName: Joi.string().required(),
      PlantCode: Joi.string().required(),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
