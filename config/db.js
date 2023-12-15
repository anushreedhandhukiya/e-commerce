const mongoose = require('mongoose')
const {config} = require("dotenv")
require("dotenv").config()

const connected = async()=>{
    await mongoose.connect(process.env.DB_URL)
    console.log("connected")
}

module.exports = connected