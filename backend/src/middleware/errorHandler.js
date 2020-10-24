const {ValidationError: SequelizeValidationError} = require("sequelize");
const RequestError = require("../error/RequestError");
const {ValidationError: JoiValidationError} = require("joi");

const errorHandler = (err, req, res, next) => {
  try {
    if(process.env.NODE_ENV==="development") console.trace({err});
    if (err instanceof RequestError) return res.status(err.status).send(err);
    if( err instanceof SequelizeValidationError) return res.status(404).send( RequestError.badRequest(err.errors[0].message, err.errors[0].path))
    if( err instanceof JoiValidationError) return res.status(404).send( RequestError.badRequest(err.details[0].message));
    return res.sendStatus(500);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = errorHandler;
