async function AuthOTP(req, res) {
    const { otp } = req.body; // OTP passed from client
    const userOTP = req.cookies.otp; // Retrieve OTP from cookies
    const otpExpiry = req.cookies.otpExpiry; // Retrieve OTP expiry time from cookies

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
        res.clearCookie('otp');
        res.clearCookie('otpExpiry');
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
