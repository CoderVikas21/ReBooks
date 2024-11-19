
const express = require("express");
const { mongoose } = require("mongoose");


const userSchema = new mongoose.Schema({
    firstname : {
        type:String,
        required:true,
        trim:true
    },
    lastname : {
        type:String,
        required:true,
        trim:true
    },
    email :{
        type:String,
        required:true,
    },
    password : {
        type:String,
        required:true,
        trim:true,
        minlength: [6, 'Password must be at least 6 characters long.'],
    },
    buyed :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book"
    }],
    sold : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book"
    }],
    cart : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Book"
    }]
});

module.exports = mongoose.model("User" , userSchema);