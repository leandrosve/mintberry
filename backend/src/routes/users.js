var express = require("express");
const { validateSchema } = require("../middleware/validator");
var router = express.Router();
const loginSchema = require("../validation/schemas/users/login");
const signupSchema = require("../validation/schemas/users/signup");
var bcrypt = require("bcrypt");
const users = require("../db/users");
const jwt = require("jsonwebtoken");
const refreshTokenSchema = require("../validation/schemas/users/refreshToken");
const User = require("../db/models/User");
const RequestError = require("../error/RequestError");
const { matchedData } = require("express-validator");
const { generateTokensForUser, verifyRefreshToken } = require("../util/jwt");

let refreshTokens = [];

const comparePasswords = (password, encrypted) =>
  bcrypt.compareSync(password, encrypted);

const encryptPassword = (password) => bcrypt.hashSync(password, 10);

const verifyToken = router.post("/error", (req, res, next) => {
  const error = new Error("sadasdas");
  error.status = 404;
  next(error);
});

router.post("/login", validateSchema(loginSchema), (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user && comparePasswords(req.body.password, user.password))
        res.status(200).send(generateTokensForUser(user));
      else {
        next(RequestError.forbidden("username and password do not match"));
      }
    })
    .catch(({ errors }) =>
      RequestError.forbidden(errors[0].message, errors[0].path)
    );
});

router.post(
  "/token",
  validateSchema(refreshTokenSchema),
  ({ body }, res, next) => {
    const refreshToken = body.refreshToken;
    if (!refreshTokens.includes(refreshToken))
      return next(RequestError.invalidToken());
    verifyRefreshToken(refreshToken)
      .then((user) => res.status(200).send(generateTokensForUser(user)))
      .catch((err) => next(err));
  }
);

router.post("/signup", validateSchema(signupSchema), async (req, res, next) => {
  let { passwordConfirmation, ...user } = req.body;
  user.password = encryptPassword(user.password);
  User.create({
    ...user,
  })
    .then(() => res.sendStatus(201))
    .catch((err) =>
      next(RequestError.badRequest(err.errors[0].message, err.errors[0].path))
    );
});

module.exports = router;
