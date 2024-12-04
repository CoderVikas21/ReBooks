const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { trusted } = require("mongoose");
require("dotenv").config();

async function Login(req,res){
    const {email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).
        json({ 
            success:false,
            message: "Please provide all fields" 
        });
    }
   

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({
                success:false,
                message: "User doesn't exists" 
            });
        }

        // Encrypt the password
        let userPassword = existingUser.password;
        //in compare function first arg is plain pass from req body and second arg is hashed pass from DB
        let matched = await bcrypt.compare(password , userPassword);

        if(!matched){
            return res.status(400).
            json({ 
                success:false,
                message: "Either Email or Password is wrong" 
            }); 
        }

        // Send success response with the token
        const payload = {
            userId : existingUser._id
        }
        const secretKey = process.env.JWT_KEY;
        const options = {
            expiresIn: "1d"
        }

        const token = jwt.sign(payload,secretKey,options);
        //send this cookie in res to frontend(client)

        res.cookie("token" , token ,{
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production', // Use true if using HTTPS
            sameSite: 'None',
            path: '/'
        });

        res.status(201).json({
            success : true,
            message: `Welcome, ${existingUser.firstname}`,
            user:existingUser.firstname
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success:false,
            message: "Server error" 
        });
    }
}

async function Logout(req,res){
    try{
        res.clearCookie('token', {
            httpOnly: true,
            secure: false, // Match the secure flag
            sameSite: 'strict',
            path: '/', // Match the path
        });
        return res.status(200).json({
            success:true,
            message: "Happy Reading, Comeback soon 😊"
        })
    }
    catch(e){
        console.log("Error occured",e.message)
    }
}

module.exports = {Login,Logout};
