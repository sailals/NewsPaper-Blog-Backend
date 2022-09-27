const express = require("express");
const router = express.Router();
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const genAuthToken = require("../utility/genAuthToken");

router.post("/", async (req, res) => {
  try {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).send("Invalid Email or Password");
    }

    const isValid = await bcrypt.compare(req.body.password, user.password);

    if (!isValid) {
      return res.status(400).send("Invalid Email or Password");
    }

    const token = genAuthToken(user);

    res.status(200).send(token);

    return token;
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
