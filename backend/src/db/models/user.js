const sequelize  = require("../index");
const {Sequelize} = require("sequelize");

const User = sequelize.define("user",
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
    // options
    timestamps: false,
  }
);






module.exports= User;
