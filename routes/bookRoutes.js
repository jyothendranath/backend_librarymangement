const { Router } = require("express");
const Book = require("../models/book");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    publication: req.body.publication,
    link: req.body.link,
    addedBy: req.body.addedBy,
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getBookById, (req, res) => {
  res.status(200).json(res.book);
});

// update individual
router.patch("/:id", getBookById, async (req, res) => {
  if (req.body.title != null) {
    res.book.title = req.body.title;
  }
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.ISBN != null) {
    res.book.ISBN = req.body.ISBN;
  }
  if (req.body.publication != null) {
    res.book.publication = req.body.publication;
  }
  if (req.body.link != null) {
    res.book.link = req.body.link;
  }
  if (req.body.addedBy != null) {
    res.book.addedBy = req.body.addedBy;
  }
  try {
    const updatedBook = await res.book.save();
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getBookById, async (req, res) => {
  try {
    await res.book.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getBookById(req, res, nxt) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(400).json({ message: "Book does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  res.book = book;
  nxt();
}

module.exports = router;
