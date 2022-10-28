module.exports = (handleRequest) => {
  return async (req, res, next) => {
    try {
      await handleRequest(req, res, next).catch(next);
    } catch (err) {
      next(err);
    }
  };
};
