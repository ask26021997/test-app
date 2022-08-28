const express = require("express");
const Author = require("../models/author");

const router = express.Router();

// All authors
router.get("/", async (req, res) => {
  let searchOptions = {};
  if (req.query.username) {
    searchOptions.username = new RegExp(req.query.username, "i");
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query });
  } catch (err) {
    res.redirect("/");
  }
});

// new authors route
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() });
});

router.post("/", async (req, res) => {
  const author = new Author({
    username: req.body.username,
  });
  try {
    const newAuthor = await Author.create(author);
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
    return;
  } catch (err) {
    console.log(err);
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating author",
    });
  }
});

router.post("/new", (req, res) => {
  res.send("create author");
});

module.exports = router;
//
