const RequestError = require("../error/RequestError");
const taskService = require("../services/taskService");

exports.postTask = async (req, res, next) => {
  let task;
  try {
    task = await taskService.createTaskForUser(req.body, req.user);
  } catch (err) {
    return next(err);
  }
  if (task) res.status(201).send(task);
};

exports.retrieveTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await taskService.retrieveTasksFromUser(req.user);
  } catch (err) {
    return next(err);
  }
  res.status(200).send(tasks || []);
};

exports.retrieveTask = async (req, res, next) => {
  let task;
  try {
    task = await taskService.retrieveTaskFromUser(req.params.id, req.user);
  } catch (err) {
    return next(err);
  }
  if (!task) return next(RequestError.notFound());
  res.status(200).send(task);
};
