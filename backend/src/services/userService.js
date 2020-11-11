const {User,RefreshToken} = require("../db/models/");
const RequestError = require("../error/RequestError");
const { generateTokensForUser, verifyRefreshToken, verifyAccessToken } = require("../helpers/jwt");
const { encryptPassword, comparePasswords } = require("../helpers/passwords");
const { validate } = require("../helpers/validator");
const loginSchema = require("../validation/schemas/users/login");
const signupSchema = require("../validation/schemas/users/signup");


exports.extractUserFromToken = async (token) =>{
  if(!token) throw RequestError.invalidToken();
  const user = await verifyAccessToken(token);
  if(!user) throw RequestError.invalidToken();
  return user;
}

exports.authenticateUser = async ({ email, password }) => {
  validateLoginInfo({ email, password });
  const user = await User.findOne({ where: { email } });
  if (!user || !comparePasswords(password, user.password))
    throw RequestError.unauthorized("errors.auth.login");
  const credentials = generateTokensForUser(user);
  if (credentials)
    await RefreshToken.create({ token: credentials.refreshToken });
  return credentials;
};

exports.refreshAuthentication = async (refreshToken) => {
  if (!refreshToken) throw RequestError.badRequest("errors.auth.noToken");
  const user = await verifyRefreshToken(refreshToken);
  if (!user) throw RequestError.badRequest("errors.auth.malformedToken");
  const currentRefreshToken = await RefreshToken.findOne({
    where: { token: refreshToken },
  });
  if (!currentRefreshToken) throw RequestError.invalidToken();
  const newCredentials = generateTokensForUser(user);
  await currentRefreshToken.update({ token: newCredentials.refreshToken });
  return newCredentials;
};

exports.invalidateAuthentication = async (refreshToken) => {
  if (!refreshToken) throw RequestError.invalidToken();
  const currentRefreshToken = await RefreshToken.findOne({
    where: { token: refreshToken },
  });
  if (!currentRefreshToken) throw RequestError.invalidToken();
  await currentRefreshToken.destroy();
  return true;
};
exports.createUser = async (userInfo) => {
  validateUserInfo(userInfo);
  const sanitizedUserInfo = sanitizeUserInfo(userInfo);
  sanitizedUserInfo.password = encryptPassword(sanitizedUserInfo.password);
  const user = await User.create(sanitizedUserInfo);
  return user;
};

exports.retrieveUserInfo = async (user) =>{
  const userInfo = await User.findByPk(user.id);
  if(!userInfo) throw RequestError.notFound("errors.users.notFound");
  const {id, username, email} = userInfo;
  return {id, username, email}
}

const validateLoginInfo = ({ email, password }) =>
  validate(loginSchema, { email, password });

const validateUserInfo = (userInfo) => validate(signupSchema, userInfo);

const sanitizeUserInfo = (userInfo) => {
  return {
    username: userInfo.username,
    email: userInfo.email.toLowerCase(),
    password: userInfo.password,
  };
};
