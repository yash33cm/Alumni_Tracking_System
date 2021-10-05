const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const collegeSchema = new Schema({
  collegeName: {
    type: String,
    required: true,
  },
  program: {
    type: Array,
    default: [],
  },
  courses: {
    type: Array,
    default: [],
  },
  Alumni: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],

  CollegePost: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});
module.exports = mongoose.model("College", collegeSchema);

// 61279db9487ea01ce0eebf7a -cllgid
//61210c237866263040436dbd -userid
