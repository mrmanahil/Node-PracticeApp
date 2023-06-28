const bodyParser = require("body-parser");

const parserMiddleware = (router) => {
  router.use(bodyParser.json());
};

module.exports = parserMiddleware;
