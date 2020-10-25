exports.validate = (schema, data) => {
  const result = schema.validate(data, {allowUnknown: true});
  if (result.error) {
    throw result.error;
  }
  return true;
};
