// controllers/uploadFile.js
const multer = require('multer');

// Set up multer memory storage (stores file in memory, you can change this for disk storage as needed)
const storage = multer.memoryStorage();

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Export the multer instance so it can be used as middleware in the routes
module.exports = upload;
