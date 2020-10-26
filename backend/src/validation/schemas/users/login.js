const Joi = require("joi");
const RequestError = require("../../../error/RequestError");
module.exports = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).error(RequestError.badRequest("Invalid credentials."));
