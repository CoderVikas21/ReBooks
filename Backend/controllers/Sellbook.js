const cloudinary = require('../config/cloundinary');  // Import the cloudinary config
const Book = require('../models/bookSchema');  // Import your Book model
const multer = require('multer');



const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('imgfile');

function Sellbook(req,res){
   
    
    
}



module.exports = Sellbook;