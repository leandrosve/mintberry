const { extractTokenFromHeader} = require("../helpers/jwt");
const { extractUserFromToken } = require("../services/userService");

const exceptedPaths = [
  "/api/users/login",
  "/api/users/signup",
  "/api/users/token",
  "/api/users/error",
  "/api/users/logout",
];

module.exports = async (req, res, next) => {
  try {
    if (exceptedPaths.includes(req.path)) {
      return next();
    }
    const token = extractTokenFromHeader(req);
    const user = await extractUserFromToken(token);
    req.user= user;
    return next()
  } catch (error) {
    next(error)
  }
};
