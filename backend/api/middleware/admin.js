const createError = require("http-errors");
const { roles } = require("../../utils/constants");
module.exports = async (req, res, next) => {
  try {
    if (req.userdata.user_role === roles.admin) {
      next();
    } else {
      throw createError.Unauthorized("you are not an Admin");
    }
  } catch (error) {
    next(error);
  }
};
