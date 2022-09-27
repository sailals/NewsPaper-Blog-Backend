const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "25mb" }));

// Route Imports

const RegisterRoute = require("./routes/register");
const UserLogin = require("./routes/login");
const PostRoute = require("./routes/post");

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Blog Website");
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to Mongo Db Atlas Successfully..."))
  .catch((err) => console.log(err));

app.use("/api/register", RegisterRoute);
app.use("/api/login", UserLogin);
app.use("/api/post", PostRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Connected to ${port}`);
});
