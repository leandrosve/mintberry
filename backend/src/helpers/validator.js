const validate = (schema, data) => {
  const result = schema.validate(data, { allowUnknown: true });
  if (result.error) {
    throw result.error;
  }
  return true;
};

const isObjectEmpty = (obj) => Object.entries(obj).length === 0;

const removeEmpty = (obj) =>
  Object.entries(obj).forEach(([key, val]) => {
    if (val == null) delete obj[key];
  });

module.exports = {
  validate,
  removeEmpty,
  isObjectEmpty,
};

