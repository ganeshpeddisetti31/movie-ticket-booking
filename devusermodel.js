const mongoose = require("mongoose");

const devuser = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    confirmpassword: {
        type : String,
        required : true
    }
})
module.exports = mongoose.model("gandhi",devuser);