const RequestError = require("../error/RequestError");

const errorHandler = (err, req, res, next) => {
  try {
    if(process.env.NODE_ENV==="development")
        console.log(err);
    if (err instanceof RequestError) return res.status(err.status).send(err);
    res.sendStatus(500);
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = errorHandler;
