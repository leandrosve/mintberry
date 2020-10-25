const RequestError = require("../error/RequestError");
const userService = require("../services/userService");

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const credentials = await userService.authenticateUser({ email, password }).catch((err) =>
    next(err)
  );
  return res.status(200).send(credentials);
};

exports.signup = async (req, res, next) => {
  const user = await userService.createUser(req.body).catch((err) => next(err));
  if (user) return res.sendStatus(201);
  next(RequestError.unhandled());
};

exports.refreshToken = async (req, res, next) => {
  const credentials = await userService.refreshAuthentication(req.body.refreshToken).catch((err) => next(err));
  if (credentials) return res.status(200).send(credentials);
  next(RequestError.unhandled());
};

exports.logout = async (req, res, next) => {
  const success = await userService.invalidateAuthentication(req.body.refreshToken).catch((err) => next(err));
  if (success) return res.status(200).send();
  next(RequestError.unhandled());
};
