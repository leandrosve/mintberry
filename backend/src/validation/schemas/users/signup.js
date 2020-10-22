module.exports = {
  email: {
    isEmail: {
      errorMessage: "Inavlid emailsssss",
    },
  },
  username: {
    isLength: {
      errorMessage: "Invalid username",
      options: { min: 3, max: 50 },
    },
  },
  password: {
    matches: {
      options: [/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/],
      errorMessage: "regex failed",
    },
  },
  passwordConfirmation: {
    custom: {
      options: (value, { req }) => {
        return value === req.body.password;
      },
      errorMessage: "Passwords do not match",
    },
  },
};
