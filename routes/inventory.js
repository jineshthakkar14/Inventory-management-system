const express = require('express');
const router = express.Router();
const { addItemToInventory } = require('../controllers/inventory'); // Adjust the path as per your project structure
const { auth, isAdmin } = require('../middlewares/auth');

router.post('/addItemToInventory', auth, isAdmin, addItemToInventory);

module.exports = router;