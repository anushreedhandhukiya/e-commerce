const express = require("express");
const cookie = require("cookie-parser");
const session=require("express-session");
const userRoute = require("./routes/user.route");
const productRoute = require("./routes/product.route");
const { verifyToken } = require("./middleware/auth");
const connected = require("./Config/db");
const app = express();
app.use(express.json());

app.use(cookie());
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoute);
app.use("/product", productRoute);

app.get("/",verifyToken,(req,res)=>{
  res.render("home")
})

app.listen(8090, () => {
  console.log("Listening on 8090");
  connected()
});
