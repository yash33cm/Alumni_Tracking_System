const createError = require("http-errors");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw createError.Unauthorized();
    }
    const payload = await jwt.verify(token, process.env.SECRETSTRING);
    if (!payload) {
      throw createError.Unauthorized();
    }
    req.userdata = payload;
    // console.log(req.userdata);
    next();
  } catch (error) {
    // error = createError.Unauthorized();
    next(error);
  }
};
