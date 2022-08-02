const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./modules/blog");
const multer = require("multer");
const path = require("path");
const { dirname } = require("path");

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

// storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "./public/uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "" + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (true) {
    cb(null, true);
    console.log("filter isleyir");
  } else {
    cb(null, false);
    console.log("error burdadir");
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

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

app.post("/add", upload.single("image"), (req, res) => {
  const blog = new Blog({
    fName: req.body.fName,
    lName: req.body.lName,
    note: req.body.note,
    img: req.file.filename,
  });

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

app.delete("/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ link: "admin" });
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
