const Joi = require("joi");
const RequestError = require("../../../error/RequestError");
module.exports = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(1)
    .max(300)
    .required()
    .error(RequestError.badRequest("errors.users.invalidUsername", "username")),
  email: Joi.string()
    .email()
    .required()
    .error(RequestError.badRequest("errors.users.invalidEmail", "email")),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/))
    .required()
    .error(
      RequestError.badRequest(
        "errors.users.weakPassword",
        "password"
      )
    ),
  passwordConfirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .error(
      RequestError.badRequest("errors.users.passwordConfirmation", "passwordConfirmation")
    ),
});
