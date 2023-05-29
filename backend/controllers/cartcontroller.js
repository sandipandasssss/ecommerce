const Cart = require("../models/cartModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Add a product to the cart
exports.addItemToCart = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHander('Product not found', 404));
  }

  // Check if the product is already in the cart
  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    let itemIndex = cart.items.findIndex((item) => item.product == productId);

    // If the product is already in the cart, update the quantity
    if (itemIndex !== -1) {
      let productItem = cart.items[itemIndex];
      productItem.quantity += quantity;
      cart.items[itemIndex] = productItem;
    } else {
      // If the product is not in the cart, add it
      cart.items.push({ product: productId, quantity });
    }
    cart = await cart.save();
    return res.status(200).json({ success: true, cart });
  } else {
    // If there is no cart for the user, create a new cart
    const newCart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });

    return res.status(200).json({ success: true, cart: newCart });
  }
});

// Get the user's cart
exports.getCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate({
    path: 'items.product',
    select: 'name price image',
  });

  if (!cart) {
    return next(new ErrorHander('Cart not found', 404));
  }

  res.status(200).json({ success: true, cart });
});

// Update the quantity of an item in the cart
exports.updateCartQuantity = catchAsyncErrors(async (req, res, next) => {
  const { productId, quantity } = req.body;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHander('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex((item) => item.product == productId);

  if (itemIndex !== -1) {
    let productItem = cart.items[itemIndex];
    productItem.quantity = quantity;
    cart.items[itemIndex] = productItem;
    await cart.save();
    return res.status(200).json({ success: true, cart });
  } else {
    return next(new ErrorHander('Item not found in cart', 404));
  }
});

// Remove an item from the cart
exports.removeItemFromCart = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHander('Cart not found', 404));
  }

  const itemIndex = cart.items.findIndex((item) => item.product == productId);

  if (itemIndex !== -1) {
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return res.status(200).json({ success: true, cart });
  } else {
    return next(new ErrorHander('Item not found in cart', 404));
  }
});

