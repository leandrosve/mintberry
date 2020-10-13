import * as Yup from "yup";
import i18n from "../i18n";

const t = (name) => i18n.t(name);
export default {
  initialValues: {
    username: "",
    name: "",
    password: "",
    passwordRepeat: "",
  },
  validationSchema: Yup.object({
    username: Yup.string()
      .required(t("fields.validation.required"))
      .min(3, t("fields.validation.tooShort", { minLength: 3 }))
      .max(50, t("fields.validation.tooLong", { maxLength: 50 })),

    name: Yup.string()
      .required(i18n.t("fields.validation.required"))
      .max(50, t("fields.validation.tooLong", { maxLength: 50 })),
    password: Yup.string()
      .required(t("fields.validation.required"))
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/,
        t("fields.validation.passwordWeak")
      )
      .max(100, t("fields.validation.tooLong", { maxLength: 100 })),
    passwordRepeat: Yup.string()
      .required(t("fields.validation.required"))
      .oneOf(
        [Yup.ref("password"), null],
        t("fields.validation.passwordsDontMatch")
      ),
  }),
};
