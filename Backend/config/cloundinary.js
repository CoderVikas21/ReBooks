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


//upload func for cloudinary

async function uploadCloudinary(file, folder) {
    const options = { 
        folder,
        resource_type: "auto" // Automatically detect resource type (image, video, etc.)
    };

    try {
        const res = await cloudinary.uploader.upload(file, options);
        return res; // Return the result of the upload
    }
    catch (err) {
        console.log("Cloudinary upload error:", err);
        throw err; // Rethrow error so it can be caught in the calling function
    }
}

module.exports = {cloudConnect,uploadCloudinary};