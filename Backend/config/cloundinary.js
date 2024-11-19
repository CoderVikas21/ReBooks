const cloudinary = require("cloudinary").v2;

require("dotenv").config();

async function cloudConnect(){  
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY,  
            api_secret: process.env.CLOUDINARY_API_SECRET
        })

        console.log("Cloud DB connected successfully")
    }
    catch(e){
        return res.status(400).json({
            success:false,
            message:e.message
        })
    }
};

module.exports = cloudConnect;