import * as Yup from "yup";
export default {
  initialValues: { username: "", password: "" },

  validationSchema: Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required(),
  }),
};
