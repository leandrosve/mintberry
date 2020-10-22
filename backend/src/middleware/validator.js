const { validationResult, checkSchema } = require("express-validator");
const RequestError = require("../error/RequestError");

const validateSchema = (schema) => [checkSchema(schema), validate];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = errors.array()[0];
  return next(RequestError.badRequest(error.msg, error.param));
};

module.exports = {
  validateSchema,
};
