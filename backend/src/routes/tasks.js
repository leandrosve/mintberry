var express = require("express");
var router = express.Router();
const { param } = require("express-validator");
const createSchema = require("../validation/schemas/tasks/create");
const { validateSchema } = require("../middleware/validator");
const taskList = require("../db/tasks");
const RequestError = require("../error/RequestError");

router.get("/", function (req, res, next) {
  const tasks = taskList.filter((t) => t.userId === req.user.id);
  res.status(200).send(tasks);
});

router.get("/:id", param("id").toInt(), function (req, res, next) {
  const task = taskList.find((t) => t.id === req.params.id);
  if (!task) return next(RequestError.notFound());
  if (task.userId !== req.user.id)
    return next(RequestError.forbidden("The requested resource is not yours."));
  res.status(200).send(task);
});

router.post("/", validateSchema(createSchema), (req, res) => {
  const response = {
    id: 1,
    userId: req.user.id,
    ...req.body,
    state: "RUNNING",
    createdAt: new Date().toUTCString(),
    startedAt: new Date().toUTCString(),
    finishedAt: null,
  };
  res.status(200).send(response);
});

module.exports = router;
