const setError = (code, message) => {
  const err = new err();
  err.code = code;
  err.message = message;
  return err;
};

module.exports = { setError };
