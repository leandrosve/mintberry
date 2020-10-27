const Joi = require("joi");
const RequestError = require("../../../error/RequestError");
module.exports = Joi.object({
  title: Joi.string()
    .min(1)
    .max(256)
    .error(RequestError.badRequest("errors.tasks.invalidTitle", "title")),
  description: Joi.string()
    .max(256)
    .error(RequestError.badRequest("errors.tasks.invalidDescription", "description")),
  expiresAt: Joi.date()
    .error(RequestError.badRequest("errors.tasks.invalidExpiracyDate", "expiresAt")),
  image: Joi.string()
    .error(RequestError.badRequest("errors.tasks.invalidImageURL", "image")),
});
