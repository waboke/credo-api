
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
            res.status(200).json(payment);
                
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
    const headers = {
        Authorization: API_KEY_SECRET,
        "Content-Type": "application/json",
    };
    await axios.get(sandbox + `/transaction/${req.query.ref}/verify`, {
            headers,
        })
        .then((response) => {
            res.send(response);
            
  })
  .catch((error) => {
    console.log("Response:", error);
    return res.status(401).send({
        Error: error,
    });
});
}