// models/Collection.js
const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  creator: {
    type: String,
    required: true,
    lowercase: true,
  },
  coverImage: String,
  nfts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NFT",
    },
  ],
});

const Collection = mongoose.model("Collection", collectionSchema);
module.exports = Collection;
