const checkRequiredFields = (fields, res) => {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      const errorMessage = `${key} Is Required`;
      return res
        .status(409)
        .send({ data: { success: false, message: errorMessage } });
    }
  }
};

module.exports = { checkRequiredFields };
