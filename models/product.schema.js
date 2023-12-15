const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: String,
  price: Number,
  desc: String,
  category: String,
  img: String,
  stock: Number,
  rating: [{ userid: String, value: Number }],
  size: String,
  colour: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
});

const product = mongoose.model("Product", ProductSchema);
module.exports = product;
