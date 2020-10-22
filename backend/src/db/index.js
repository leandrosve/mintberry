

const Sequelize = require('sequelize');

// Option 1: Passing parameters separately
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect:'mysql' 
});

sequelize.authenticate()
  .then(() => console.log("connected to database"))
  .catch("database connection failed");

module.exports=sequelize;


/*
//mysql connection
var mysql = require('mysql2')

var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

connection.connect();

module.exports= connection;
*/