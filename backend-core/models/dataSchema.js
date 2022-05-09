const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("BOOK", dataSchema);

module.exports = Book;
