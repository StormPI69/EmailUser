const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }

})

module.exports=mongoose.model("users",signUpTemplate)