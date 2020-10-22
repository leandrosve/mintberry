module.exports = {
  title: {
    isLength: {
      options: { min: 1, max: 200 },
      errorMessage: "cannot be empty",
    },
  },
  description: {
    isLength: {
      options: { max: 512 },
      errorMessage: "too long",
    },
  },
  expiresAt: {
    isAfter: {
      options: new Date().toUTCString(),
      errorMessage: "date must be future",
    },
  },
  image: {
    isURL: {
      errorMessage: "invalid URL",
    },
  },
};
