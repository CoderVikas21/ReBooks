const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { listSearchIndexes } = require('../models/bookSchema');
require("dotenv").config();

async function SendMail(req, res) {
    try {
        const newOtp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });     


        //so anyone cnt access it in application tab of inspect element in browser
        const encryptedOTP = await bcrypt.hash(newOtp, 10);

        // Store OTP in session
        
        let otpExpiry = Date.now() + 5 * 60 * 1000; // 5-minute expiry

        res.cookie('otp', encryptedOTP, { 
            httpOnly: true,  // Makes the cookie accessible only to the server (security)
            secure: process.env.NODE_ENV == 'production',  // Ensure cookies are sent over HTTPS
            maxAge: 5 * 60 * 1000  // Cookie expiry time (5 minutes)
        });
        res.cookie('otpExpiry', otpExpiry, { 
            sameSite: 'None',
            secure: process.env.NODE_ENV == 'production', 
            maxAge: 5 * 60 * 1000 
        });

        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Enter email first"
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.mail_host,
            auth: {
                user: process.env.mail, // sender mail
                pass: process.env.pass, // app password
            },
        });

        const info = await transporter.sendMail({
            from: "ReBooks",
            to: email, // receiver
            subject: "Verify OTP",
            html: `<h2>Here is your OTP below:</h2> <p>OTP: ${newOtp}</p>`
        });

        return res.status(200).json({
            success: true,
            message: "Check your email for OTP"
        });

    } 
    catch (e) {
        console.log(e.message);
        return res.status(200).json({
            success: false,
            message: "Unable to send OTP"
        });
    }
}

module.exports = SendMail;
