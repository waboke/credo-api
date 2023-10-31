const express=require('express');
const router = express.Router();

router.get('/users', (req, res)=>{
    res.status(200).json({
        success: true,
        message: "All users"
    });
})

module.exports = router;