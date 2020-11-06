const {ValidationError: SequelizeValidationError} = require("sequelize");
const RequestError = require("../error/RequestError");
const {ValidationError: JoiValidationError} = require("joi");
const i18next = require('i18next');

const formatSequelizeError = (err) =>{
  const first = err.errors[0];
  const prefix="errors.sequelize";
  return RequestError.badRequest(i18next.t(`${prefix}.${first.path}_${first.validatorKey}`), first.path)
}
const errorHandler = (err, req, res, next) => {
  try {
    if(process.env.NODE_ENV==="development") console.trace({err});
    if (err instanceof RequestError) return res.status(err.status).send({...err, error:{...err.error, message:i18next.t(err.error.message)}});
    if( err instanceof SequelizeValidationError) return res.status(400).send(formatSequelizeError(err))
    if( err instanceof JoiValidationError) return res.status(400).send( RequestError.badRequest(err.details[0].message));
    return res.sendStatus(500);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = errorHandler;
