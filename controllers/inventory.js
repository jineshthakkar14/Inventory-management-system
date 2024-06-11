const Product = require('../models/product');
const User = require('../models/user');

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

exports.removeItemFromInventory = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Get userId from authenticated user

  // Check if productId and quantity are provided
  if (!productId || !quantity) {
    return res.status(400).json({
      success: false,
      message: 'Product ID and quantity are required.',
    });
  }

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    // Check if the quantity to remove is greater than the available quantity
    if (product.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Quantity to remove exceeds available quantity.',
      });
    }

    // Reduce the product quantity
    product.quantity -= quantity;

    // If the product quantity reaches zero, delete the product
    if (product.quantity === 0) {
      await Product.findByIdAndDelete(productId);

      // Update user's products array to remove the product ID
      await User.findByIdAndUpdate(
        userId,
        { $pull: { products: productId } },
        { new: true }
      );
    } else {
      // Save the updated product
      await product.save();
    }

    res.status(200).json({
      success: true,
      message: 'Product quantity updated successfully.',
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      success: false,
      message: 'Error updating product quantity.',
    });
  }
};

