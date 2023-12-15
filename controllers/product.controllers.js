const product = require("../models/product.schema");
const Cart = require("../models/cart.schema");
const Razorpay = require("razorpay");

const home = async (req, res) => {
    try {
        let data = await product.find();
        res.send(data);
    }
    catch (error) {
        res.status(404).send({ error: error.message });
    }
}

const createproduct = async (req, res) => {
    req.body.createdBy = req.user.id
    let data = await product.create(req.body);
    res.send(data);
}

const adminproduct = async (req, res) => {
    let data = await product.find({ createdBy: req.user.id })
    res.send(data);
}

const productpage = async (req, res) => {
    res.render("product")
}

const users = async (req, res) => {
    res.render("user")
}

const cart = async (req, res) => {
    let userId = req.user.id;
    req.body.userId = userId;

    let data = await Cart.create(req.body)
    console.log(data);
    res.send(data)
}

const cartdata = async (req, res) => {
    let data = await Cart.find({ userId: req.user.id }).populate("productId")
    res.send(data)
}

const cartpage = async (req, res) => {
    res.render("cart")
}

const updatedata = async (req, res) => {
    let { qty } = req.body
    let { id } = req.params
    let data = await Cart.findById(id)
    data.qty = data.qty + qty
    await data.save()
    if (data.qty == 0) {
        await Cart.findByIdAndDelete(id)
    }
    res.send({ update: data })
}

let razorpay = new Razorpay({
    key_id: "rzp_test_aseYwd9Lw0lp7m",
    key_secret:"Z5PEDx1r727w21A97LuCr6ri"
})

const payment = (req, res) => {
    let options = {
        amount: req.body.amount * 100,
        currency: "INR"
    }
    razorpay.orders.create(options, (err, order) => {
        if (err) {
            console.log(err);
            res.send({ status: err })
        }
        else {
            res.send(order)
        }
    })
}

module.exports = { home, users, productpage, adminproduct, createproduct, cart, cartdata, cartpage, updatedata, payment }