import * as Yup from "yup";
import i18n from "../i18n";

const t = (name) => i18n.t(name);
export default {
  initialValues: {
    name: "",
    address: "",
  },
  validationSchema: Yup.object({
    name: Yup.string()
      .required(i18n.t("fields.validation.required"))
      .max(100, t("fields.validation.tooLong", { maxLength: 100 })),
    address: Yup.string()
      .required(i18n.t("fields.validation.required"))
      .max(100, t("fields.validation.tooLong", { maxLength: 100 })),
  }),
};
