var router = require("express").Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController.retrieveTasks);

router.get("/:id", taskController.retrieveTask);

router.delete("/:id", taskController.deleteTask);

router.patch("/:id", taskController.updateTaskInfo);

router.post("/", taskController.postTask);

router.post("/:id/:action", taskController.updateTaskStatus);

module.exports = router;
