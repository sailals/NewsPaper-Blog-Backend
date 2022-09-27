const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
