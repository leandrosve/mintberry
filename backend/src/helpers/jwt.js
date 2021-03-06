const jwt = require("jsonwebtoken");
const accessTokenSchema = require("../validation/schemas/users/token");
const refreshTokenSchema = require("../validation/schemas/users/refreshToken");

const extractTokenFromHeader = (req) => {
  const authHeader = req.headers["authorization"];
  return authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;
};

const extractUser = (token, secret) =>
  new Promise((resolve) => {
    jwt.verify(token, secret, (err, user) => {
      if (!err && user) resolve(user);
      resolve();
    });
  });

const verifyAccessToken = async (token) => {
 
  const user = await extractUser(token, process.env.ACCESS_TOKEN_SECRET);
  if (user && !accessTokenSchema.validate(user).error) return user;
  return;
};

const verifyRefreshToken = async (token) => {
  const user = await extractUser(token, process.env.REFRESH_TOKEN_SECRET);
  if (user && !refreshTokenSchema.validate(user).error) return user;
};

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
  return { accessToken, refreshToken };
};

module.exports = {
  extractTokenFromHeader,
  verifyAccessToken,
  verifyRefreshToken,
  generateTokensForUser,
};
