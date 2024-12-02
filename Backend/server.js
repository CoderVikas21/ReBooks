const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
require("dotenv").config();

//parsing cookies during authentication
app.use(cookieparser());
//body parser
app.use(express.json());

//for cross origin
app.use(
    cors({
        origin: process.env.FRONTEND_URL, // Replace with your Netlify frontend URL
        methods: "GET,POST,PUT,DELETE",
        credentials: true, // If using cookies or authentication
    })
);


const DBConnect = require("./config/Database");
DBConnect();
const cloudConnect = require("./config/cloundinary");
cloudConnect();


const routes = require("./routes/routes")
app.use("/api/v1/" , routes);


const PORT = process.env.PORT || 8000;

app.get('/', (req,res)=>{
    res.send("Hello bhai! I am backend")
})


app.listen(PORT,()=>{
    console.log(`Server Started at : ${PORT}`)
})