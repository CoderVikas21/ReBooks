const mongoose = require("mongoose");
require("dotenv").config();

async function DBConnect(){
    try{
        await mongoose.connect(process.env.DB_URL);
        console.log("DB Connected Successfully");
        return;
    }
    catch(e){
        console.log("Error in DB Connection");
        console.log(e.message);
    }
    
}

module.exports = DBConnect;