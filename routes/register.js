const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const genAuthToken = require("../utility/genAuthToken");

// User Register

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });

  if (user) {
    return res.status(400).send("User Already Exsist");
  }

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  const token = genAuthToken(user);

  res.status(200).send(token);
  return token;
});

module.exports = router;
