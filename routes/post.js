const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const cloudinary = require("../utility/cloudinary");
//Create Post-->

router.post("/", async (req, res) => {
  const { username, title, desc, image, cat } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "onlineshop",
      });
      if (uploadRes) {
        const post = new Post({
          username,
          title,
          desc,
          category: cat,
          image: uploadRes,
        });
        const savedPost = await post.save();

        res.status(200).send(savedPost);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

// Get Post of Particular Id-->

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
  }
});

// TO get All Post, To get all post of a user ,to get all post of a particular category

router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.cat;

  try {
    let post;

    if (username) {
      post = await Post.find({ username: username });
    } else if (category) {
      post = await Post.find({ category: category });
    } else {
      post = await Post.find().sort({ _id: -1 });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

router.get("/all/post", async (req, res) => {
  try {
    const response = await Post.find().sort({ _id: -1 }).limit(3);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
});

module.exports = router;
