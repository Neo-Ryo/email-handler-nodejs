module.exports = (regex, msg) =>
  function (req, res, next) {
    if (regex.test(req.body.email)) {
      next();
    } else {
      res.status(400).json({
        status: 'error',
        message: msg,
      });
    }
  };

module.exports.emailIntCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
