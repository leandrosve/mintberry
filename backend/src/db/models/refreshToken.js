const sequelize  = require("../index");
const {Sequelize} = require("sequelize");

const refreshToken= sequelize.define("refresh_token",
  {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    modelName: "refresh_token",
    // options
    timestamps: false
  }
);

module.exports= refreshToken;
