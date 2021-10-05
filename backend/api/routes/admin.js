const express = require("express");
const createHttpError = require("http-errors");
const router = express.Router();
const User = require("../models/userModel");

router.patch("/verify/:userId", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      throw new createHttpError.NotFound("user not found");
    } else {
      if (user.verified === false) {
        const verify = await User.findByIdAndUpdate(req.params.userId, {
          $set: { verified: true },
        });
        res.status(201).json({
          message: "user is verified",
        });
      } else {
        throw new createHttpError.UnprocessableEntity(
          "user is already verified"
        );
      }
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:userId", async (req, res, next) => {
  try {
    const finduser = await User.findById(req.params.userId);
    if (!finduser) {
      throw new createHttpError.NotFound("user is not found");
    }
    const deleteuser = await User.findByIdAndDelete(req.params.userId);
    if (deleteuser) {
      res.status(200).json({ message: "1 user is deleted" });
    } else {
      throw new createHttpError.InternalServerError("user is not deleted");
    }
  } catch (error) {
    next(error);
  }
});
module.exports = router;
