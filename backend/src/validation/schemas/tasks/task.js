const Joi = require("joi");
const RequestError = require("../../../error/RequestError");
module.exports = Joi.object({
  title: Joi.string()
    .min(1)
    .max(256)
    .required()
    .error(RequestError.badRequest("Invalid title.", "title")),
  description: Joi.string()
    .max(256)
    .error(RequestError.badRequest("Invalid description.", "description")),
  expiresAt: Joi.date()
    .required()
    .error(RequestError.badRequest("Invalid expiracy date", "expiresAt")),
  image: Joi.string()
    .error(RequestError.badRequest("Invalid image URL.", "image")),
});
