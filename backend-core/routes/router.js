const express = require("express");
const router = express.Router();

require("../db/conn");
const Book = require("../models/dataSchema");

router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.log(err);
  }
});

router.post("/addbook", async (req, res) => {
  const { name, author, price, isbn } = req.body;

  if (!name || !author || !price || !isbn) {
    return res.status(422).json({ error: "please fill all the fields" });
  }
  try {
    const book = new Book({
      name,
      author,
      price,
      isbn,
    });

    const saved = await book.save();
    if (saved) {
      res.status(201).json({ message: "book added successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.status(200).json({ message: "book deleted successfully" });
      // res.send({ redirect: "/" });
    }
  } catch (err) {
    console.log(err);
  }
  console.log(req.params.id);
});

router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    res.json(req.params.id);
    const data = await Book.updateOne(
      { id: req.params.id },
      { $set: req.body }
    );
    if (data) {
      res.status(200).json({ message: "book updated successfully" });
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
