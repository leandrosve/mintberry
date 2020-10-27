const { validate, removeEmpty, isObjectEmpty } = require("../helpers/validator");
const taskSchema = require("../validation/schemas/tasks/task");
const Task = require("../db/models/Task");
const RequestError = require("../error/RequestError");
const User = require("../db/models/User");
const updateTaskSchema = require("../validation/schemas/tasks/updateTask");
const i18next = require('i18next');

const createTaskForUser = async (taskInfo, user) => {
  validateTaskInfo(taskInfo);
  const sanitizedTaskInfo = sanitizeTaskInfo(taskInfo);
  sanitizedTaskInfo.userId = user.id;
  sanitizedTaskInfo.startedAt = new Date();
  sanitizedTaskInfo.status = "RUNNING";
  const task = await Task.create(sanitizedTaskInfo).catch(() => {
    throw RequestError.unhandled("errors.tasks.create.error");
  });
  return task;
};

const retrieveTasksFromUser = async (user) => {
  const userModel = await User.findByPk(user.id);
  const tasks = userModel && (await userModel.getTasks());
  return tasks || [];
};

const retrieveTaskFromUser = async (taskId, user) => {

  const task = await Task.findOne({ where: { id: taskId } });
  if (!task) throw RequestError.notFound("errors.tasks.notFound");
  if (task.userId !== user.id)
    throw RequestError.forbidden("errors.tasks.forbidden");
  else return task;
};

const deleteTaskFromUser = async (taskId, user) => {
  const task = await this.retrieveTaskFromUser(taskId, user);
  const success = await Task.destroy({ where: { id: task.id } });
  if (success) return task;
};

const updateTaskInfoFromUser = async (taskId, taskInfo = {}, user) => {
  const task = await this.retrieveTaskFromUser(taskId, user);
  if(isObjectEmpty(taskInfo)) throw RequestError.badRequest("errors.tasks.update.invalid");
  validateUpdateTaskInfo(taskInfo);
  const sanitizedTaskInfo = sanitizeTaskInfo(taskInfo);
  removeEmpty(sanitizedTaskInfo);
  if(!sanitizedTaskInfo) throw RequestError.badRequest("errors.tasks.update.invalid");
  await task.update(sanitizedTaskInfo);
  return task;
};

const performActionOverTaskFromUser = async (taskId, action, user) => {
  const task = await this.retrieveTaskFromUser(taskId, user);
  if (actionStatusMap[action] == null)
    throw RequestError.badRequest("errors.tasks.update.invalid");
  if(task.status === "FINISHED") throw RequestError.badRequest("errors.tasks.update.isFinished");
  if(task.status === "CANCELLED") throw RequestError.badRequest("errors.tasks.update.isCancelled");
  const finishedAt = action === "finish" ? new Date() : null;
  await task.update({ status: actionStatusMap[action], finishedAt });
  return task;
};

const actionStatusMap = {
  ["start"]: "RUNNING",
  ["pause"]: "PAUSED",
  ["finish"]: "FINISHED",
  ["cancel"]: "CANCELLED",
};

const validateUpdateTaskInfo = (taskInfo) => validate(updateTaskSchema, taskInfo);
const validateTaskInfo = (taskInfo) => validate(taskSchema, taskInfo);

const sanitizeTaskInfo = ({ title, description, image, expiresAt }) => ({
  title,
  description,
  expiresAt: expiresAt ? new Date(expiresAt) : null,
  image,
});

module.exports={
  createTaskForUser,
  retrieveTaskFromUser,
  retrieveTasksFromUser,
  updateTaskInfoFromUser,
  performActionOverTaskFromUser,
  deleteTaskFromUser,
}
