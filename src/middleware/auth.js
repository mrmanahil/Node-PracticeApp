const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const authHeader =
    req.body.token || req.query.token || req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).send({
      success: false,
      message: "A token is required for authentication",
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      success: false,
      message: "A token is required for authentication",
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: "Invalid Token",
    });
  }
  return next();
};

module.exports = verifyToken;
