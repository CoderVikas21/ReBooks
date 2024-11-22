const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
const session = require('express-session');
require("dotenv").config();

//parsing cookies during authentication
app.use(cookieparser());

app.use(cors({
    origin:'http://localhost:3000',    //local frontend url
    // origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Your  netlify frontend URL
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json());

app.use(session({
    secret: 'vikas123456', // Secret key to sign session IDs
    resave: false, // Don't save sessions that haven't been modified
    saveUninitialized: false, // Don't save uninitialized sessions
    cookie: {
      httpOnly: true, // Make the cookie accessible only by the server
      secure: false, // Set to true if using HTTPS
      maxAge: 5 * 60 *1000, // Session cookie will expire in 5 minute
    }
  }));

const DBConnect = require("./config/Database");
DBConnect();
// const cloudConnect = require("./config/cloundinary");
// cloudConnect();


const routes = require("./routes/routes")
app.use("/api/v1/" , routes);


const PORT = process.env.PORT || 8000;

app.get('/', (req,res)=>{
    res.send("Hello bhai! I am backend")
})


app.listen(PORT,()=>{
    console.log(`Server Started at : ${PORT}`)
})