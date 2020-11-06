import * as Yup from "yup";
export default {
  initialValues: { email: "", password: "" },

  validationSchema: Yup.object({
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),
};
