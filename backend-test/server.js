const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
app.listen("3000");

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
