const Product = require('../models/product'); // Adjust the path as per your project structure
const User = require('../models/user'); // Adjust the path as per your project structure

exports.addItemToInventory = async (req, res) => {
  const { productId, quantity, name, price, description } = req.body;
  const userId = req.user.id; // Get userId from authenticated user

  // Check if all required fields are provided
  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: 'All fields (productId, quantity, name, price, description) are required.',
    });
  }

  try {
    // Check if the product already exists
    let product = await Product.findById(productId);

    if (product) {
      // If product exists, update the quantity
      product.quantity += quantity;
    } else {
      // If product does not exist, create a new product
      product = new Product({ _id: productId, quantity, name, price, description });
    }

    // Save the product (either update or insert)
    await product.save();

    // Find user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    // Check if productId already exists in user's products array
    if (!user.products.includes(productId)) {
      // Update user's products array
      user.products.push(productId);
      await user.save();
    }

    res.status(200).json({
      success: true,
      message: 'Product added to user inventory.',
      product,
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Error adding product to user inventory.',
    });
  }
};
