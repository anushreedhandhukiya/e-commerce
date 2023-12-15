const { Router } = require("express");
const productRoute=Router()
const { verifyToken, isAdmin } = require("../middleware/auth");
const { home, adminproduct, productpage, users, createproduct, cartdata, cartpage, cart, updatedata, payment } = require("../controllers/product.controllers");


productRoute.get("/",home)
productRoute.get("/adminProduct",isAdmin,adminproduct)
productRoute.get("/create",isAdmin,productpage)
productRoute.post("/create",isAdmin,createproduct)
productRoute.get("/user",isAdmin,users)
productRoute.post("/cart",verifyToken,cart)
productRoute.get("/cart",cartpage)
productRoute.get("/cartdata",verifyToken,cartdata)
productRoute.patch("/cart/update/:id",verifyToken,updatedata)
productRoute.post("/payment",payment)


module.exports = productRoute;