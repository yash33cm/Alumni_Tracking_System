const express = require("express");
const router = express.Router();
const isauth = require("../middleware/auth");
const isadmin = require("../middleware/admin");
const createError = require("http-errors");
const College = require("../models/cllgModel");
const User = require("../models/userModel");

router.get("/", async (req, res, next) => {
  try {
    const colleges = await College.find()
      .populate(
        "Alumni",
        "username email role verified course program graduated_year"
      )
      .populate("CollegePost", "eventTitle description createdAt");
    if (!colleges) {
      throw createError.NotFound("colleges not found");
    } else {
      // const { __v, ...college } = colleges;
      let cllg = colleges.map((college) => {
        return {
          id: college._id,
          collegeName: college.collegeName,
          alumni: college.Alumni,
          programs: college.program,
          courses: college.courses,
          collegePost: college.CollegePost,
        };
      });
      res.status(200).json(cllg);
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/alumni/:collegeId", async (req, res, next) => {
  try {
    const findcllg = await College.findById(req.params.collegeId);
    if (!findcllg) {
      throw new createError.NotFound("college not found");
    }
    const isalumni = findcllg.Alumni.filter((resy) => resy === req.body.alumni);
    if (isalumni.length > 0) {
      throw new createError.UnprocessableEntity(
        "user is already an alumni of this cllg"
      );
    }
    const isuser = await User.findById(req.body.alumni);
    if (!isuser) {
      throw new createError.NotFound("user is not found or valid");
    }
    const addalumni = await College.findByIdAndUpdate(req.params.collegeId, {
      $push: { Alumni: req.body.alumni },
    });
    if (addalumni) {
      res.status(201).json({ message: "user added to the college" });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/posts/:collegeId", isauth, isadmin, async (req, res, next) => {
  try {
    const findcllg = await College.findById(req.params.collegeId);
    if (!findcllg) {
      throw new createError.NotFound("college not found");
    }
    const ispost = findcllg.Alumni.find((resp) => resp === req.body.postId);
    if (ispost) {
      throw new createError.UnprocessableEntity("post is already posted");
    }
    const addpost = await College.findByIdAndUpdate(req.params.collegeId, {
      $push: { CollegePost: req.body.postId },
    });
    if (addpost) {
      res.status(201).json({ message: "post is added to the college!!!" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", isauth, isadmin, async (req, res, next) => {
  try {
    const { collegeName, program, courses } = req.body;
    if (!collegeName || program.length === 0 || courses.length === 0) {
      throw createError.UnprocessableEntity("fill all fields");
    }
    const cllg = new College({
      collegeName,
      program,
      courses,
    });

    const result = await cllg.save();
    if (!result) {
      throw createError.UnprocessableEntity("error while saving");
    } else {
      const { __v, ...others } = result._doc;
      res.status(201).json({
        status: 201,
        message: "college added",
        collegeDetails: others,
      });
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
