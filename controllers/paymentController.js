const Payments = require('../models/payments');
const axios = require("axios");
const sandbox = "https://api.public.credodemo.com";
let API_KEY = `0PUB0343N2CgejxQoEkP5bu7DzZZSUud`;
//let API_KEY_SECRET = "0PRI0994wI1Nd1vVNNMN4L40btYNyD3k";

exports.getPayments = (req, res, next)=>{
    res.status(200).json({
                success: true,
                middleware: req.user,
                message: "All payments"
            });
}
exports.postPayments= async (req, res, next) => {
    
    const requestData = {
        amount: req.body.amount,
        bearer: 0,
        callbackUrl: req.body.callbackUrl,
        channels: ["card", "bank"],
        currency: req.body.currency,
        customerFirstName: req.body.customerFirstName,
        customerLastName: req.body.customerLastName,
        customerPhoneNumber: req.body.customerPhoneNumber,
        email: req.body.email
    };
   
    const headers = {
        Authorization: API_KEY,
        "Content-Type": "application/json",
    };
     await axios.post(sandbox + "/transaction/initialize", requestData, {
            headers
        })
        .then((response) => {
            //adding data to mongo db
            const payment = new Payments({
                customerFirstName: response.customerFirstName
            });
            
           // const payments=  payments.create(requestData);
            console.log(payment);
           
                
        })
        .catch((error) => {
            console.log("Response:", error);
            return res.status(401).send({
                Error: error,
            });
        });
}

