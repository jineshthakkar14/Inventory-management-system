const express = require('express');
const { addItemToCart } = require('../controllers/cart');
const { isCustomer, auth } = require('../middlewares/auth');
const router = express.Router();

router.post('/addItemToCart', auth, isCustomer, addItemToCart);

module.exports = router;