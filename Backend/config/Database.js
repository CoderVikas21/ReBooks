const mongoose = require("mongoose");
require("dotenv").config();

async function DBConnect(){
    await mongoose.connect(process.env.DB_URL)
    .then(()=>{
        console.log("DB Connected Successfully");
    })
    .catch(()=>{
        console.log("Error in DB Connection");
    })
}

module.exports = DBConnect;