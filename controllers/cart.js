const Product = require('../models/product');
const User = require('../models/user');

exports.addItemToCart = async (req, res) => {
  const { customerId, productId, quantity } = req.body;

  if (!customerId || !productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: 'Customer ID, product ID, and quantity are required.',
    });
  }

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found in inventory.',
      });
    }

    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Requested quantity exceeds available quantity.',
      });
    }

    const customer = await User.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer not found.',
      });
    }

    const existingCartItemIndex = customer.cart.findIndex(item => item.product.toString() === productId);

    if (existingCartItemIndex !== -1) {
      customer.cart[existingCartItemIndex].quantity += quantity;
    } else {
      customer.cart.push({ product: productId, quantity });
    }

    await customer.save();

    product.quantity -= quantity;
    await product.save();

    res.status(200).json({
      success: true,
      message: 'Item added to cart successfully.',
      cart: customer.cart,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Error adding item to cart.',
    });
  }
};
