const express = require("express");
const router = express.Router();
const isauth = require("../middleware/auth");
const isadmin = require("../middleware/admin");
const Post = require("../models/postModel");
const createError = require("http-errors");
router.get("/", async (req, res, next) => {
  try {
    const allpost = await Post.find();
    if (!allpost) {
      throw createError.NotFound("no posts found");
    } else {
      let posts = allpost.map((post) => {
        let { __v, ...others } = post._doc;
        return others;
      });
      res.status(200).json({
        count: posts.length,
        allposts: posts,
      });
    }
  } catch (error) {
    next(error);
  }
});
router.post("/", isauth, isadmin, async (req, res, next) => {
  try {
    const { eventTitle, description } = req.body;
    const post = new Post({
      eventTitle,
      description,
    });
    const result = await post.save();
    if (!result) {
      throw createError.InternalServerError("not able to save");
    }
    const { __v, ...rest } = result._doc;
    res.status(201).json({
      message: "new post/event added",
      postdetail: rest,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
