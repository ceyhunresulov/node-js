const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    fName: {
      type: String,
      require: true,
    },
    lName: {
      type: String,
      require: true,
    },
    note: {
      type: String,
      require: true,
    },
    img: {
      type: String,
      require: true,
    },
  },
  { timestemps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
