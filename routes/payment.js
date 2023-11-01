const express=require('express');
const router = express.Router();

//importing payments controllers
const { postPayments, getPayments, getVerifyPayment} = require('../controllers/paymentController.js');

router.route('/payments').post(postPayments);
router.route('/payments').get(getPayments);
router.route('/verifypayments').get(getVerifyPayment);

module.exports = router;