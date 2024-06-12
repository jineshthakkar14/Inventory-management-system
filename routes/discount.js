const express = require('express');
const router = express.Router();
const { auth, isCustomer, isAdmin, } = require('../middlewares/auth');
const { applyDiscountCoupon } = require('../controllers/discount.js');
const { addDiscountCoupon } = require('../controllers/discount.js');

router.post('/applyDiscountCoupon', auth, isCustomer, applyDiscountCoupon);
router.post('/addDiscountCoupon', auth, isAdmin, addDiscountCoupon);


module.exports = router;