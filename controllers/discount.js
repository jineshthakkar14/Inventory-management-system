const DiscountCoupon = require('../models/discount');

exports.addDiscountCoupon = async (req, res) => {
  const { code, percentOff, maxDiscountAmount } = req.body;

  if (!code || !percentOff || !maxDiscountAmount) {
    return res.status(400).json({
      success: false,
      message: 'Code, percentage discount, and maximum discount amount are required.',
    });
  }

  try {
    // Create a new discount coupon
    const newDiscountCoupon = new DiscountCoupon({
      code,
      percentOff,
      maxDiscountAmount,
    });

    // Save the discount coupon to the database
    await newDiscountCoupon.save();

    res.status(201).json({
      success: true,
      discountCoupon: newDiscountCoupon,
      message: 'Discount coupon created successfully.',
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Failed to create discount coupon. Please try again.',
    });
  }
};


exports.applyDiscountCoupon = async (req, res) => {
  const { cartValue, discountId } = req.body;

  if (!cartValue || !discountId) {
    return res.status(400).json({
      success: false,
      message: 'Cart value and discount ID are required.',
    });
  }

  try {
    // Find the discount coupon by ID
    const discountCoupon = await DiscountCoupon.findById(discountId);

    if (!discountCoupon) {
      return res.status(404).json({
        success: false,
        message: 'Discount coupon not found.',
      });
    }

    // Calculate discounted price
    let discountAmount = (discountCoupon.percentOff / 100) * cartValue;
    if (discountAmount > discountCoupon.maxDiscountAmount) {
      discountAmount = discountCoupon.maxDiscountAmount;
    }
    const discountedPrice = cartValue - discountAmount;

    res.status(200).json({
      success: true,
      cartValue,
      discountedPrice,
      discount: {
        id: discountCoupon._id,
        code: discountCoupon.code,
        percentOff: discountCoupon.percentOff,
        maxDiscountAmount: discountCoupon.maxDiscountAmount,
      },
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Error applying discount coupon.',
    });
  }
};
