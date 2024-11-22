const express = require("express");
const cors = require("cors");
const cookieparser = require("cookie-parser");
const app = express();
require("dotenv").config();

//parsing cookies during authentication
app.use(cookieparser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json());


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