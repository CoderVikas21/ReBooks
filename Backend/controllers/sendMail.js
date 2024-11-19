const otpGenerator = require('otp-generator');
const nodemailer = require("nodemailer");
require("dotenv").config();

async function SendMail(req, res) {
    try {
        const newOtp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });

        // Store OTP in session
        req.session.otp = newOtp;
        req.session.otpExpiry = Date.now() + 5 * 60 * 1000; // 5-minute expiry

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

    } catch (e) {
        console.log(e.message);
        return res.status(200).json({
            success: false,
            message: "Unable to send OTP"
        });
    }
}

module.exports = SendMail;