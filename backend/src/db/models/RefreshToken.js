const { Sequelize } = require("sequelize");
var db = require("../");
const Model = Sequelize.Model;

class RefreshToken extends Model {};

RefreshToken.init(
  {
    token: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    modelName: "refresh_token",
    // options
    timestamps: false
  }
);

module.exports= RefreshToken;
