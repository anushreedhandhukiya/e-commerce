const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const user = require("../models/user.schema");
const nodemailer = require("nodemailer");
const otpgenerate = require("otp-generator");
const multer = require("multer");
const getpath = require("../helper");

const signup = async (req, res) => {
    let { email, password, username, role } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
            res.send({ msg: "404 error" });
        }
        else {
            let obj = { email, password: hash, username, role, };
            let data = await user.create(obj);
            let token = jwt.sign({ id: data._id, role: data.role }, "token");
            res.cookie("token", token).send({ msg: "User", val: data });
        }
    });
}

const signuppage = async (req, res) => {
    res.render("signup");
}

const login = async (req, res) => {
    const { email, password } = req.body;
    let data = await user.findOne({ email });
    if (data) {
        bcrypt.compare(password, data.password, (err, result) => {
            if (result) {
                let token = jwt.sign({ id: data._id, role: data.role }, "token");
                res.cookie("token", token).send({ msg: "user login successfully" });
            }
            else {
                res.send({ msg: "Password incorrect" });
            }
        });
    }
    else {
        res.send({ msg: "user not defined" });
    }
}

const loginpage = async (req, res) => {
    res.render("login");
}

const getuser = async (req, res) => {
    res.send({ msg: "token check" });
}


const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

const otp = async (req, res) => {
    res.render("otp");
}
const reset = async (req, res) => {
    let { email } = req.body;

    otp = otpgenerate.generate(6, {
        specialChars: false,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "reset your password",
        html: `<a href=http://localhost:8090/user/verify/${otp}>click to verify your otp ${otp}</a>`,
    };
    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log(info);
        }
    });
    res.send(mailOptions);
}

const verify = async (req, res) => {
    let { token } = req.params

    if (token == otp) {
        res.send("Verified token")
    }
    else {
        res.send("wrong otp")
    }
}

const store = multer.diskStorage({
    destination: "images",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: store
}).single("img")

const images = async (req, res) => {
    let path = getpath()
    path += `/${req.file.path}`
    let User = await user.findById(req.user.id)
    User.img = path
    console.log(path);
    await User.save()
    res.send(User)
}

const uploadimg = (req, res) => {
    res.render("uploadimg")
}

module.exports = { signuppage, signup, login, loginpage, getuser, otp, reset, verify, upload, images, uploadimg };