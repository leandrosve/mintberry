const { Sequelize } = require("sequelize");
var db = require("../");

const Model = Sequelize.Model;
const User = require("./User");

class Task extends Model {}

Task.init(
  {
    userId: {
      type: Sequelize.INTEGER,
      field: "user_id",
      references: {
        model: User,
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      defaultValue: "RUNNING",
      allowNull: false,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      allowNull: false,
      field: "created_at",
    },
    startedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      field: "started_at",
    },
    expiresAt: {
      type: Sequelize.DATE,
      allowNull: false,
      field: "expires_at",
    },
    finishedAt: {
      type: Sequelize.DATE,
      field: "finished_at",
    },
    image: {
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "task",
    // options
    timestamps: false,
  }
);

module.exports = Task;
