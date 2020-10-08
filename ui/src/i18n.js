import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import es from "./translations/es";
import en from "./translations/en";
import LanguageDetector from "i18next-browser-languagedetector";
import moment from "moment";
import "moment/locale/es";

const resources = {
  en,
  es,
};

const setMomentLocale = () => moment.locale(i18n.language);

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .then(() => {
    setMomentLocale();
    i18n.on("languageChanged", () => setMomentLocale());
  });

export default i18n;
