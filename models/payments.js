const mongoose =require('mongoose');
const paymentSchema = new mongoose.Schema({
    email: {
        type: String
       
    },
    amount: {
        type: Number
       
    },
    reference: {
        type: String
        
    },
    status: {
        type: String
      },
    postDate:{
        type: Date,
        default: Date.now
    },
    });
    // const payment = mongoose.model('Payments', paymentSchema);
    // module.exports = {payment}
    module.exports = mongoose.model("payments",paymentSchema);
  