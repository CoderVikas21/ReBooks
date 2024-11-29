
const Book = require('../models/bookSchema');  // Import your Book model
const cloudinary = require("cloudinary").v2;



//upload func for cloudinary

async function uploadCloudinary(file, folder) {
    const options = { 
        folder,
        resource_type: "auto" // Automatically detect resource type (image, video, etc.)
    };

    try {
        const res = await cloudinary.uploader.upload(file.buffer, options);
        return res; // Return the result of the upload
    }
    catch (err) {
        console.log("Cloudinary upload error:", err);
        throw err; // Rethrow error so it can be caught in the calling function
    }
}


// Sellbook function
async function Sellbook(req, res) {
        // Now we can access the fields sent by the frontend
       // Get seller ID (assuming authentication middleware is applied)
        const userId = req.userId;
        
        // Get book details from the request body
        const { name, author, price, description, genre } = req.body;
        const imgFile = req.file;
        console.log(imgFile)

    // Check for all fields
        // if (!name || !author || !price || !description || !genre || !imgFile) {
        //     return res.status(400).json({
        //         success: false,
        //         message: "All fields are required"
        //     });
        // }

    try {
        // Upload the image to Cloudinary
        let validExt = ["jpg","jpeg","png"];
        let ext =  imgFile.originalname.split('.')[1].toLowerCase();

        if(!validExt.includes(ext)){
            //validation, if file type is supported
            return res.status(400).json({
                success:false,
                message:"Only jpg, jpeg, png extension allowed"
            })
        }

        const response  = await uploadCloudinary(imgFile,"Rebooks");
        console.log("CloudResponse->" , response);
        
        // Create a new book document
        const newBook = new Book({
            name: name,
            author: author,
            price: price,
            description: description,
            genre: genre,
            imgUrl: null, // Store the Cloudinary URL
            seller: userId,
        });

        // Save the book
        // await newBook.save();

        return res.status(200).json({
            success: true,
            message: "Book published successfully"
        });
    } 
    catch(e){
        console.log(e.message)
        res.status(400).json({
            message:"Failed upload"
        })
       }

        
}

module.exports = Sellbook;
