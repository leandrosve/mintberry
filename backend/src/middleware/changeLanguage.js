const i18next = require("i18next");
const changeLanguage = (req, res, next) => {
  const lang = req.headers["accept-language"] || "en";
  req.i18n.changeLanguage(lang);
  i18next.changeLanguage(lang);
  next();
};

module.exports = changeLanguage;
