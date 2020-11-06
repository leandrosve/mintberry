import * as Yup from "yup";
import i18n from "../i18n";

const t = (name) => i18n.t(name);
let schema = Yup.object({
  username: Yup.string()
    .required("fields.validation.required")
    .min(3, "fields.validation.tooShort", { minLength: 3 })
    .max(50, "fields.validation.tooLong", { maxLength: 50 }),
  email: Yup.string()
    .email("fields.validation.emailInvalid")
    .required("fields.validation.required")
    .min(3, "fields.validation.tooShort", { minLength: 3 })
    .max(50, "fields.validation.tooLong", { maxLength: 50 }),
  password: Yup.string()
    .required("fields.validation.required")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/,
      "fields.validation.passwordWeak"
    )
    .max(100, "fields.validation.tooLong", { maxLength: 100 }),
  passwordConfirmation: Yup.string()
    .required("fields.validation.required")
    .oneOf(
      [Yup.ref("password"), null],
      "fields.validation.passwordsDontMatch"
    ),
});

export default {
  initialValues: {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  },
  validationSchema: schema,
};
