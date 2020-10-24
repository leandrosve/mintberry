const Joi = require("joi");

module.exports = Joi.object({
  username: Joi.string().alphanum().min(1).max(300).required(),
  email: Joi.string().email().required(),
  id: Joi.number().required(),
  iat: Joi.number().required(),
  exp: Joi.number(),
});
