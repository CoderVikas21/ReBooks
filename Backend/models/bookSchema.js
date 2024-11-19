const express = require("express");
const  mongoose  = require("mongoose");

const bookSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
        trim:true
    },
    author : {
        type:String,
        required:true,
        trim:true
    },
    price : {
        type:Number,
        required:true,
    },
    description : {
        type:String,
        required:true,
    },
    genre : {
        type:String,
        required:true,
    },
    imgUrl : {
        type:String,
        required:true
    },
    buyer : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : null
    },
    seller : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        default : null
    }
});

module.exports = mongoose.model("Book" , bookSchema);