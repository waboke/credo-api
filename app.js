var bodyParser = require('body-parser')
const express = require("express");
const app =express();
const dotenv = require("dotenv");

//setting up config file variables
dotenv.config({path: './config/.env'});

//importing routes
const payments =require('./routes/payment');
//import database
const connectDatabase =require('./config/database');

//connect to the database
connectDatabase();
//set up bodyparser
app.use(bodyParser.urlencoded({extended: true})) 
app.use(bodyParser.json()) 
app.use(express.json());
//middleware
const middleware = (req, res, next)=>{
    console.log("hello middleware");
    //setting global variables
    req.user = "William Rupert";
    next();
    };
 app.use(middleware)

//using routes
app.use("/api/v1", payments);

const PORT = process.env.PORT;
const NODE_ENV =process.env.NODE_ENV;
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT} in ${NODE_ENV} mode`)
})