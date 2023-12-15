const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  let { token } = req.cookies;
  // console.log(token);
  if(token){
    let data = jwt.verify(token, "token");
    if (data) {
      req.user = data;
      // console.log(req.user);
      next();
    } else {
      res.send("Invalid token ");
    }
  }
  else{
    res.send("token not received");
  }
};

const isAdmin = (req, res, next) => {
    let { token } = req.cookies;
    if (!token) {
      return res.redirect("/user/login");
    }
    
    let data = jwt.verify(token, "token");
    if (data.role == "admin") {
      req.user=data
      return next();
    } else {
      return res.send("not authorized");
    }
  };


module.exports ={verifyToken,isAdmin};