const express=require('express');
const router = express.Router();

//importing payments controllers
const { postPayments, getPayments} = require('../controllers/paymentController.js');

router.route('/payments').post(postPayments);
router.route('/payments').get(getPayments);

module.exports = router;