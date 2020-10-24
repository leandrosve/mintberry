var express = require("express");
const { validateSchema } = require("../middleware/validator");
var router = express.Router();
const refreshTokenSchema = require("../validation/schemas/users/refreshToken");
const userController = require("../controllers/userController");


router.post("/login", userController.login);

router.post("/token",userController.refreshToken);

router.post("/signup", userController.signup);

router.post("/logout", userController.logout);

module.exports = router;
