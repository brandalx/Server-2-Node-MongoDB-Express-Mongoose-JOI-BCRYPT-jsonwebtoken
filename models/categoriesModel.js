const mongoose = require("mongoose");

let schema = new mongoose.Schema({
  name: String,
  info: String,
  cat_url: String,
  img_url: String,
  date_created: {
    type: Date,
    default: Date.now,
  },
});
exports.CategoryModel = mongoose.model("categories", schema);
