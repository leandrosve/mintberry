var express = require("express");
var router = express.Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.retrieveTasks);

router.get("/:id", taskController.retrieveTask);

router.post("/", taskController.postTask);

module.exports = router;
