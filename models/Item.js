const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  borrowed: {
    type: Boolean,
    required: true
  }
});

module.exports = Item = mongoose.model("item", ItemSchema);
