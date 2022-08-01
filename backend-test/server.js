const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./modules/blog");

const app = express();

const dbURL =
  "mongodb+srv://ceyhun:23042000@cluster0.jn3bg.mongodb.net/furniture?retryWrites=true&w=majority";

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    app.listen("3000");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/catalog", (req, res) => {
  res.render("catalog");
});

app.get("/product", (req, res) => {
  res.render("product");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", (req, res) => {
  console.log(req.body);
  console.log("--------------------");
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      console.log(result + "salam");
      res.redirect("/admin");
    })
    .catch((err) => console.log(err));
});
app.get("/admin", (req, res) => {
  Blog.find()
    .then((result) => {
      res.render("admin", { blogs: result });
    })
    .catch((err) => console.log(err));
});

// app.get("/add", (req, res) => {
//   const blog = new Blog({
//     title: "birde salam",
//     desc: "ne var ne yox",
//   });
//   blog
//     .save()
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err + "errrrror");
//     });
// });
