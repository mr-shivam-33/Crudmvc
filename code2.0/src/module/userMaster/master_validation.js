const Joi = require("joi");

const addModule = {
  body: Joi.object().keys({
    ModuleName: Joi.string().required(),
    Icon: Joi.string().required(),
    ParentId: Joi.number().required(),
    SequenceNo: Joi.number().required(),
  }),
};

module.exports = {
  addModule,
};
