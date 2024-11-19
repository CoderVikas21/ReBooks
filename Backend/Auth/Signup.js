const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function Signup(req,res){
    const { firstname, lastname, email, password, confirmpassword } = req.body;

    if (!firstname || !lastname || !email || !password || !confirmpassword) {
        return res.status(400).
        json({ 
            success:false,
            message: "Please provide all fields" 
        });
    }
    if (password.length < 6) {
        return res.status(400).
        json({ 
            success:false,
            message: "Password must be greater than 6" 
        });
    }
    if (password !== confirmpassword) {
        return res.status(400).json({ success:false, message: "Passwords do not match" });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success:false,
                message: "User already exists" 
            });
        }

        // Encrypt the password
        const salt = await bcrypt.genSalt(10); //if two user have same pass ..their hashpass will be diff cuz their salt value is diff
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hashedPassword, // Store the encrypted password
            buyed : [],
            sold : [],
            cart : []
        });

        // Save the user to the database
        await newUser.save();

        // Create JWT Token
        // Send success response with the token
        const payload = {
            userId : newUser._id
        }
        const secretKey = process.env.JWT_KEY;
        const options = {
            expiresIn: "1d"
        }

        const token = jwt.sign(payload,secretKey,options);
        //send this cookie in res to frontend(client)
        
        res.cookie("token" , token,{
            httpOnly: true,
            secure: true, // Use true if using HTTPS
            sameSite: 'strict',
            path: '/'
        });

        // Send success response with the token
        res.status(201).json({
            success : true,
            message: "Sign In successfully",
            user: newUser.firstname
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success:false,
            message: "Server error" 
        });
    }
}

module.exports = Signup;
