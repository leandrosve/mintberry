
const RequestError = require("../error/RequestError");
const { extractToken, verifyAccessToken } = require("../util/jwt");

const exceptedPaths = [
  "/api/users/login",
  "/api/users/signup",
  "/api/users/token",
  "/api/users/error",
];

module.exports = (req, res, next) => {
  if (exceptedPaths.includes(req.path)) next();
  else {
    try {
      const token = extractToken(req);
      if (token) {
        verifyAccessToken(token)
          .then((user) => {
            req.user = user;
            next();
          })
          .catch((err) => next(err));
      } else
        next(RequestError.unauthorized("unauthorized"));
    } catch (error) {
      res.status(500).send();
    }
  }
};


