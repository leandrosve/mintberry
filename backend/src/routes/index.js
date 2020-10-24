var express = require('express');
var router = express.Router();

var usersRouter = require("./users");
var tasksRouter = require("./tasks");

router.use("/users", usersRouter);
router.use("/tasks", tasksRouter);


module.exports = router;
