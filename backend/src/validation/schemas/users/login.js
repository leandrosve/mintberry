module.exports = {
  email: {
    isEmail: {
      errorMessage: "Invalid email",
    },
  },
  password: {
    isLength: {
      options: { min: 1, max: 300 },
      errorMessage: "cannot be empty",
    },
  },
};
