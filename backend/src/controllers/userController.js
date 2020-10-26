const RequestError = require("../error/RequestError");
const userService = require("../services/userService");

exports.login = async (req, res, next) => {
  let credentials;
  const { email, password } = req.body;
  try {
    credentials = await userService.authenticateUser({ email, password });
  } catch (err) {
    return next(err);
  }
  return res.status(200).send(credentials);
};

exports.signup = async (req, res, next) => {
  let user;
  try {
    user = await userService.createUser(req.body);
  } catch (err) {
    return next(err);
  }
  if (user) return res.sendStatus(201);
};

exports.refreshToken = async (req, res, next) => {
  let credentials;
  try {
    credentials = await userService.refreshAuthentication(
      req.body.refreshToken
    );
  } catch (err) {
    return next(err);
  }
  if (credentials) return res.status(200).send(credentials);
  next(RequestError.unhandled());
};

exports.logout = async (req, res, next) => {
  let success;
  try {
    success = await userService.invalidateAuthentication(req.body.refreshToken);
  } catch (err) {
    return next(err);
  }
  if (success) return res.status(200).send();
  next(RequestError.unhandled());
};
