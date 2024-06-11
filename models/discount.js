const mongoose = require('mongoose');

const discountCouponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    percentOff: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    maxDiscountAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    // Add more fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model('DiscountCoupon', discountCouponSchema);
