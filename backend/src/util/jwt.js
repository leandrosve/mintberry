const jwt = require("jsonwebtoken");
const RequestError = require("../error/RequestError");
const tokenSchema = require("../validation/schemas/users/token");

const extractToken = (req) => {
  const authHeader = req.headers["authorization"];
  return authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;
};

const verifyToken = (token, secret) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      if (err || tokenSchema.validate(user).error)
        reject(RequestError.invalidToken());
      resolve(user);
    });
  });

const verifyAccessToken = (token) =>
  verifyToken(token, process.env.ACCESS_TOKEN_SECRET);

const verifyRefreshToken = (token) =>
  verifyToken(token, process.env.REFRESH_TOKEN_SECRET);

const generateTokensForUser = (user = {}) => {
  const accessToken = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRACY_TIME }
  );
  const refreshToken = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    process.env.REFRESH_TOKEN_SECRET
  );
  console.log("must add to refresh tokens");
  return { accessToken, refreshToken };
};

module.exports = {
  extractToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokensForUser,
};
