var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
var indexRouter = require("./routes/index");
const authFilter = require("./middleware/authFilter");
let i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const Backend = require("i18next-node-fs-backend");
const changeLanguage = require("./middleware/changeLanguage");
const i18nConfig = require("./locales/config");

var app = express();

i18next.use(Backend).init(i18nConfig);

app.use(i18nextMiddleware.handle(i18next));

app.use(changeLanguage);

const errorHandler = require("./middleware/errorHandler");
const RequestError = require("./error/RequestError");

if (process.env.NODE_ENV !== "testing") app.use(logger("dev"));
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

console.info();
app.use(errorHandler);

app.disable("etag");

module.exports = app;
