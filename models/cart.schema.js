const mongoose = require('mongoose')

let cartSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    qty: { type: Number, default: 1 }
})

const Cart = mongoose.model("cart", cartSchema)
module.exports = Cart;