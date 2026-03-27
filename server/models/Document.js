const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: String,
  category: String,
  file: String,
  status: {
    type: String,
    default: "Pending"
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Document", documentSchema);