// models/NFT.js
const mongoose = require("mongoose");

const nftSchema = new mongoose.Schema({
  tokenId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  creator: {
    type: String,
    required: true,
    lowercase: true,
  },
  owner: {
    type: String,
    required: true,
    lowercase: true,
  },
  price: Number,
  isListed: {
    type: Boolean,
    default: false,
  },
});

const NFT = mongoose.model("NFT", nftSchema);
module.exports = NFT;
