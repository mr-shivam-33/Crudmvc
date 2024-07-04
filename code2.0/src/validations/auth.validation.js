const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    Email: Joi.string().required().email(),
    Password: Joi.string().required().custom(password),
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    EmployeeCode: Joi.string().required(),
    Mobile: Joi.string().required(),
    UserRole: Joi.string().required(),
    UserName: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    UserName: Joi.string().required(),
    Password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    user: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    Email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    token: Joi.string().required(),
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
};
