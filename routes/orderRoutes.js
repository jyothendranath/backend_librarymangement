const { Router } = require("express");
const Order = require("../models/order");
const Book = require("./../models/book");

const router = Router();

// get collection
router.get("/", async (req, res) => {
  try {
    let orders = await Order.find();
    for (let i = 0; i < orders.length; i++) {
      orders[i].bookId = await Book.findById(orders[i].bookId);
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// create individual
router.post("/", async (req, res) => {
  const book = await Book.findById(req.body.bookId);
  const order = new Order({
    date: req.body.date,
    username: req.body.username,
    bookId: book,
    return: req.body.return,
  });
  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// get individual
router.get("/:id", getOrderById, (req, res) => {
  res.status(200).json(res.order);
});

// update individual
router.patch("/:id", getOrderById, async (req, res) => {
  if (req.body.date != null) {
    res.order.date = req.body.date;
  }
  if (req.body.username != null) {
    res.order.username = req.body.username;
  }
  if (req.body.return != null) {
    res.order.return = req.body.return;
  }
  if (req.body.bookId != null) {
    res.order.bookId = await Book.findById(req.body.bookId);
  }
  try {
    const updatedOrder = await res.order.save();
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete individual
router.delete("/:id", getOrderById, async (req, res) => {
  try {
    await res.order.remove();
    res.status(200).json({ message: "deleted succesfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getOrderById(req, res, nxt) {
  let order;
  try {
    order = await Order.findById(req.params.id);
    if (order == null) {
      return res.status(400).json({ message: "Order does not exist" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  order.bookId = await Book.findById(order.bookId);
  res.order = order;
  nxt();
}

module.exports = router;
