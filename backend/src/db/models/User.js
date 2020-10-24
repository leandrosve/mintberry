const { Sequelize } = require("sequelize");
var db = require("../");
const Model = Sequelize.Model;

class User extends Model {};

User.init(
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "user",
    // options
    timestamps: false
  }
);

module.exports= User;
