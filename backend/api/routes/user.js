const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const createError = require("http-errors");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const isauth = require("../middleware/auth");
const isadmin = require("../middleware/admin");
const { roles } = require("../../utils/constants");
router.get("/", (req, res) => {
  res.send("hello user");
});

router.post("/register", async (req, res, next) => {
  try {
    const {
      username,
      email,
      college,
      program,
      course,
      graduated_year,
      password,
      Cpassword,
      verified,
    } = req.body;
    let role;
    if (
      !username ||
      !email ||
      !password ||
      !college ||
      !program ||
      !graduated_year ||
      !password ||
      !Cpassword ||
      !course
    ) {
      throw createError.UnprocessableEntity("Fill all the fields");
    }

    const existemail = await User.findOne({ email: req.body.email });
    if (existemail) {
      throw createError.UnprocessableEntity("email exists");
    }
    if (
      email === process.env.ADMIN1 ||
      email === process.env.ADMIN2 ||
      email === process.env.ADMIN3
    ) {
      role = roles.admin;
    } else {
      role = roles.user;
    }
    if (password != Cpassword) {
      throw createError.UnprocessableEntity(
        "password and confirm password not matching"
      );
    }

    const hashpass = await bcrypt.hash(password, 12);
    const hashCpass = await bcrypt.hash(Cpassword, 12);
    const user = new User({
      username,
      email,
      college,
      program,
      course,
      graduated_year,
      password: hashpass,
      Cpassword: hashCpass,
      verified,
      role: role,
    });
    const result = await user.save();
    if (result) {
      return res
        .status(201)
        .json({ message: "user is registered", result: result });
    } else {
      throw createError.UnprocessableEntity("some error occured");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw createError.UnprocessableEntity("Fill all fields");
    }
    const emailcheck = await User.findOne({ email: email });
    // console.log(emailcheck);
    if (!emailcheck) {
      throw createError.UnprocessableEntity("invalid credentials");
    }
    if (!emailcheck.verified) {
      throw createError.Unauthorized("you are not verified by admin");
    }
    const verifypass = await bcrypt.compare(password, emailcheck.password);
    if (!verifypass) {
      throw createError.UnprocessableEntity("invalid credentials");
    }
    let token = await jwt.sign(
      {
        userId: emailcheck._id,
        email: emailcheck.email,
        user_role: emailcheck.role,
      },
      process.env.SECRETSTRING,
      {
        expiresIn: "1h",
      }
    );
    if (token) {
      return res.status(200).json({
        message: "you are loggedIn",
        role: emailcheck.role,
        token: token,
        userid: emailcheck._id,
        username: emailcheck.username,
      });
    } else {
      throw createError.InternalServerError("token not generated");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/profile/:userId", isauth, async (req, res, next) => {
  try {
    const id = req.params.userId;
    const profile = await User.findById(id);
    if (profile) {
      const { password, Cpassword, __v, ...others } = profile._doc;

      return res.status(200).json({
        message: `details of ${profile.username}`,
        profiledetails: others,
      });
    }
    throw createError.NotFound("user is not found");
  } catch (error) {
    next(error);
  }
});

router.get("/users", isauth, isadmin, async (req, res, next) => {
  try {
    const results = await User.find();
    if (results) {
      return res.status(200).json({
        count: results.length,
        Allusers: results.map((result) => {
          let { password, Cpassword, __v, ...others } = result._doc;
          return others;
        }),
      });
    } else {
      throw createError.NotFound();
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/profile/:userid", isauth, async (req, res, next) => {
  try {
    const checkuser = await User.findById(req.params.userid);
    if (!checkuser) {
      throw createError.NotFound("user not found to edit");
    }
    const edit = await User.findByIdAndUpdate(req.params.userid, {
      $set: { username: req.body.username },
    });
    // console.log(edit);
    if (edit) {
      res.json({ message: "username is updated!" });
    } else {
      throw createError.InternalServerError("some error occured");
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
