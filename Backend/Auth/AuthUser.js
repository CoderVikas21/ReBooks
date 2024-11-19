const jwt = require("jsonwebtoken");
require("dotenv").config();

async function authenticate(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json(
            { success: false, message: "Register Please" });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //attach userId from token in request
        req.userId = decoded.userId;
        next();
    }
    catch(e){
        return res.status(403).json({ success: false, message: "Invalid token" });
    }

}

module.exports  = authenticate;