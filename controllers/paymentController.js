
const express = require('express');
const mongoose = require('mongoose');
const Payments = require('../models/payments');
const db = require("../config/database");
const axios = require("axios");
const sandbox = "https://api.public.credodemo.com";
let API_KEY = `0PUB0343N2CgejxQoEkP5bu7DzZZSUud`;
let API_KEY_SECRET = "0PRI0343us0tG069f18IHz9x2vITINau";

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
     axios.post(sandbox + "/transaction/initialize", requestData, {
            headers
        })
        .then((response) => {
            const email = requestData.email;
            const amount = requestData.amount;
            const reference = response.data.data.reference;
            const payment= new Payments({
                email:email,
                amount:amount,
                reference:reference,
                status:"Pending"
            })
            payment.save();
            //redirect to `https://www.credodemo.com/checkout/${response.data.data.reference}`
          return  res.status(200).send(response.data);
                
        })
        .catch((error) => {
            console.log("Response:", error);
            return res.status(401).send({
                Error: error,
            });
        });
}

//verify payment
exports.getVerifyPayment = async (req, res, next) => {
    const transRef = req.params.transRef;
    // const ref = req.params.reference;
    const headers = {
        Authorization: API_KEY_SECRET,
        "Content-Type": "application/json",
    };
    await axios.get(sandbox + `/transaction/${transRef}/verify`, {
            headers,
        })
        .then((response) => {
               if(response.data.data.status==0){
                console.log(response.data.data.businessRef);
                const ref = response.data.data.businessRef
                try {
                    Payments.findOneAndUpdate({reference:ref}, {$set:{status:"Completed"}
               },  { new:true })
               return res.send("Transaction Completed");
              
                } catch (error) {
                    console.log(error);
                }
              

               }else if (response.data.data.status===3) {
                Payments.findOneAndUpdate({reference:ref}, {$set:{status:"Failed"}})
                return res.send("Transaction Failed");
               }
            res.send({
               status: response.data
            
            
            });
            
  })
  .catch((error) => {
    console.log("Response:", error);
    return res.status(401).send({
        Error: error,
    });
});
}