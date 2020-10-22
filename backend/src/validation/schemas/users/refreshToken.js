module.exports = {
    refreshToken: {
      isLength: {
        options: { min: 1 },
        errorMessage: "token cannot be empty",
      },
    }
  };
  