const mongoose = require("mongoose");
const { roles } = require("../../utils/constants");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
  },
  college: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  graduated_year: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  Cpassword: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: [roles.user, roles.admin],
    default: roles.user,
  },
});

module.exports = mongoose.model("User", userSchema);
