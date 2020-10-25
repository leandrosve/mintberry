const { validate } = require("../helpers/validator");
const taskSchema = require("../validation/schemas/tasks/task");
const Task = require("../db/models/Task");
const RequestError = require("../error/RequestError");
const User = require("../db/models/User");

exports.createTaskForUser = async (taskInfo, user) => {
  validateTaskInfo(taskInfo);
  const sanitizedTaskInfo = sanitizeTaskInfo(taskInfo);
  sanitizedTaskInfo.userId = user.id;
  sanitizedTaskInfo.startedAt = new Date();
  sanitizedTaskInfo.status = "RUNNING";
  const task = await Task.create(sanitizedTaskInfo).catch(() => {
    throw RequestError.badRequest("Error while creating task");
  });
  return task;
};

exports.retrieveTasksFromUser = async (user) => {
  const userModel = await User.findByPk(user.id);
  const tasks = userModel && (await userModel.getTasks());
  return tasks || [];
};

exports.retrieveTaskFromUser = async (taskId, user) => {
  const task = await Task.findOne({ where: { id: taskId } });
  if (!task) throw RequestError.notFound("Could not find task");
  if (task.userId !== user.id) throw RequestError.forbidden("The requested resource is not yours.");
  return task;
};

const validateTaskInfo = (taskInfo) => validate(taskSchema, taskInfo);

const sanitizeTaskInfo = ({ title, description, image, expiresAt }) => ({
  title,
  description,
  expiresAt: new Date(expiresAt),
  image,
});
