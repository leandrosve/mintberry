module.exports = {
  backend: {
    loadPath: __dirname + "/{{lng}}/{{ns}}.json",
  },
  fallbackLng: "es",
  preload: ["en", "es"],
};
