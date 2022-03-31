const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  return: {
    type: Boolean,
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
