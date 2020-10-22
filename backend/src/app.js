var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var indexRouter = require("./routes/index");
const authFilter = require("./middleware/authFilter");

var app = express();

var db = require("./db");
const errorHandler = require("./middleware/errorHandler");
const RequestError = require("./error/RequestError");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use(authFilter);

app.use("/api", indexRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(RequestError.notFound());
});

app.use(errorHandler);

app.disable("etag");


// error handler
/*
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({ status: err.status, message: err.message });
});

*/

module.exports = app;
