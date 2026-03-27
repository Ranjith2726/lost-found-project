const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  date: Date,
  phone: String,        // NEW
  type: String,         // lost or found
  image: String,

  status: {
    type: String,
    default: "open"     // open / resolved
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Item", itemSchema);