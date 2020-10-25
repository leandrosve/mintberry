var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var indexRouter = require("./routes/index");
const authFilter = require("./middleware/authFilter");

var app = express();

const errorHandler = require("./middleware/errorHandler");
const RequestError = require("./error/RequestError");

if(process.env.NODE_ENV !== "testing")
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors());

app.use(authFilter);

app.use("/api", indexRouter);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  next(RequestError.notFound());
});

app.use(errorHandler);

app.disable("etag");

module.exports = app;
