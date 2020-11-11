const {Sequelize} = require('sequelize');

const ENV =  process.env.NODE_ENV;

// Option 1: Passing parameters separately
const sequelize = ENV === "testing" ?
new Sequelize("postgres", "postgres", "root", {
  host: process.env.DB_TEST_HOST,
  dialect: "postgres" ,
  logging: false,
})
:
new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql" ,
  logging: false,
})

sequelize.authenticate()
  //.then(() => console.log("connected to database"))
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