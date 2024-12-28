// models/Transaction.js
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  transactionHash: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["MINT", "LIST", "SALE", "TRANSFER"],
    required: true,
  },
  from: String,
  to: String,
  price: Number,
  tokenId: Number,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);
module.exports = Transaction;
