const { Sequelize } = require("sequelize");
var db = require("../");
const Task = require("./Task");
const Model = Sequelize.Model;

class User extends Model {};

User.init(
  {
    id:{
      type: Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement: true 
    },
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

User.hasMany(Task,{as: 'tasks', foreignKey: 'userId'})

Task.belongsTo(User, {foreignKey: 'userId'});

module.exports= User;
