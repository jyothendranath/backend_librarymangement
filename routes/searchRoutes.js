const { Router } = require("express");

const User = require("../models/user");
const Book = require("../models/book");
const Order = require("../models/order");

const router = Router();

router.get("/users", async (req, res) => {
  try {
    if (req.query.username !== undefined) {
      const user = await User.find({ username: req.query.username });
      res.json(user);
    } else {
      res.status(400).json({ message: "no parameters found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/books", async (req, res) => {
  let filter = {};
  for (let key in req.query) {
    filter[key] = { $regex: req.query[key], $options: "i" };
  }
  console.log(filter);
  try {
    const books = await Book.find(filter);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/orders", async (req, res) => {
  let filter = {};
  try {
    if (req.query.username !== undefined) {
      filter.username = req.query.username;
    }
    if (req.query.return !== undefined) {
      if (req.query.return === "true") {
        filter.return = true;
      }
      if (req.query.return === "false") {
        filter.return = false;
      }
    }
    if (filter === {}) {
      res.status(400).json({ message: "no parameters found" });
    }
    const orders = await Order.find(filter);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
