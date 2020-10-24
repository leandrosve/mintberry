const Joi = require("joi");
const RequestError = require("../../../error/RequestError");
module.exports = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(1)
    .max(300)
    .required()
    .error(RequestError.badRequest("Invalid username.", "username")),
  email: Joi.string()
    .email()
    .required()
    .error(RequestError.badRequest("Invalid email.", "email")),
  password: Joi.string()
    .pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/))
    .required()
    .error(
      RequestError.badRequest(
        "Password must be at least 8 characters and contain one uppercase and a number.",
        "password"
      )
    ),
  passwordConfirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .error(
      RequestError.badRequest("Passwords do not match", "passwordConfirmation")
    ),
});
