const orderService = require('../services/order.service');

async function checkout(req, res, next) {
  try {
    const order = await orderService.checkout(req.userId);
    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
}

async function cancel(req, res, next) {
  try {
    const order = await orderService.cancel(req.userId, req.params.id);
    res.json(order);
  } catch (err) {
    next(err);
  }
}

module.exports = { checkout, cancel };
