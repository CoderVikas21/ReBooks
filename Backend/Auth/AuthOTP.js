async function AuthOTP(req, res) {
    const { otp } = req.body; // OTP passed from client
    const userOTP = req.session.otp; // OTP stored in session
    const otpExpiry = req.session.otpExpiry;

    if (!userOTP) {
        return res.status(400).json({
            success: false,
            message: "OTP not found"
        });
    }

    // Check if OTP has expired
    if (Date.now() > otpExpiry) {
        return res.status(400).json({
            success: false,
            message: "OTP has expired"
        });
    }

    if (otp === userOTP) {
        return res.status(200).json({
            success: true,
            message: "OTP Verified"
        });
    } else {
        return res.status(400).json({
            success: false,
            message: "Invalid OTP"
        });
    }
}

module.exports = AuthOTP;
