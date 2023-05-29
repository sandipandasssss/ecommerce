const express = require('express');
const router = express.Router();
const {  getCart, addItemToCart, updateCartQuantity, removeItemFromCart } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middleware/auth');

router.route("/cart/add").post(isAuthenticatedUser, addItemToCart);
router.route("/cart").get(isAuthenticatedUser, getCart);
router.route("/cart/:id").put( isAuthenticatedUser, updateCartQuantity);
router.route("/cart/:id").delete(isAuthenticatedUser, removeItemFromCart);

module.exports = router;
