const { getuser, signup, login, signuppage, loginpage, otp, reset, verify, upload, images, uploadimg } = require("../controllers/user.controllers");
const { verifyToken } = require("../middleware/auth");
const {Router}=require("express");

const userRoute=Router()

userRoute.post("/signup",signup)
userRoute.get("/signup",signuppage)
userRoute.post("/login",login)
userRoute.get("/login",loginpage)
userRoute.get("/users",verifyToken,getuser)
userRoute.get("/reset",otp)
userRoute.post("/reset",reset)
userRoute.get("/verify/:token",verify)
userRoute.post("/img/upload",verifyToken,upload,images)
userRoute.get("/profile",verifyToken,uploadimg)

module.exports = userRoute;