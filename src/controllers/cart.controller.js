const cartService = require('../services/cart.service');

async function getCart(req, res, next) {
  try {
    const cart = await cartService.getOrCreateCart(req.userId);
    res.json(await cart.populate('items.product'));
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addItem(req.userId, productId, quantity);
    res.status(201).json(await cart.populate('items.product'));
  } catch (err) {
    next(err);
  }
}

module.exports = { getCart, addItem };
