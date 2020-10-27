const RequestError = require("../error/RequestError");
const { extractTokenFromHeader, verifyAccessToken } = require("../helpers/jwt");

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
    if(!token) throw RequestError.invalidToken();
    const user = await verifyAccessToken(token);
    if(!user){
      throw RequestError.invalidToken();
    }
    req.user=user;
    return next()
  } catch (error) {
    next(error)
  }
};
