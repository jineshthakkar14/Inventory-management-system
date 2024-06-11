const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    quantity: { 
        type: Number,
        required: true, 
        default: 0 
    },
    name: {
        type: String,
    },
    price:{
        type: Number,
    },
    description: { type: String },

});

module.exports = mongoose.model('Product', productSchema);

