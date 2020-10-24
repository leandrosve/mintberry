const RequestError = require("../error/RequestError");
const { extractToken, verifyAccessToken } = require("../helpers/jwt");

const exceptedPaths = [
  "/api/users/login",
  "/api/users/signup",
  "/api/users/token",
  "/api/users/error",
  "/api/users/logout",
];

module.exports = async (req, res, next) => {
  if (exceptedPaths.includes(req.path)) {
    console.log(req.path);
    return next();
  }
  try {
    const token = extractToken(req);
    const user = await verifyAccessToken(token)
    if(!user){
      console.log("unauthorized")
    }
    req.user=user
    next()
  } catch (error) {
    next(error)
  }
};
