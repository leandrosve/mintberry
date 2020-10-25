var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");


router.post("/login", userController.login);

router.post("/token",userController.refreshToken);

router.post("/signup", userController.signup);

router.post("/logout", userController.logout);

module.exports = router;
