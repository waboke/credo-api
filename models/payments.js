const mongoose =require('mongoose');



const paymentSchema = new mongoose.Schema({
    customerFirstName: {
        type: String,
        required: true,
    },
    customerLastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: true
    },
    postDate:{
        type: Date,
        default: Date.now
    },
    });
    const payment = mongoose.model('Payments', paymentSchema);
    module.exports = {payment}
  