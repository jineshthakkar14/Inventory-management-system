const express = require('express');
const router = express.Router();
const { addItemToInventory, removeItemFromInventory } = require('../controllers/inventory'); // Adjust the path as per your project structure
const { auth, isAdmin } = require('../middlewares/auth');

router.post('/addItemToInventory', auth, isAdmin, addItemToInventory);
router.post('/removeItemFromInventory', auth, isAdmin, removeItemFromInventory);

module.exports = router;