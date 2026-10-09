const mongoose = require('mongoose');
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const Order = require('../models/order.model');

async function checkout(userId) {
  const session = await mongoose.startSession();
  let order;

  await session.withTransaction(async () => {
    const cart = await Cart.findOne({ user: userId }).session(session);
    if (!cart || cart.items.length === 0) {
      throw httpError(400, 'Cart is empty');
    }

    const orderItems = [];
    let total = 0;

    for (const item of cart.items) {
      const product = await Product.findOneAndUpdate(
        { _id: item.product, stock: { $gte: item.quantity } },
        { $inc: { stock: -item.quantity } },
        { session, new: true }
      );

      if (!product) {
        throw httpError(400, `Insufficient stock for product ${item.product}`);
      }

      orderItems.push({ product: product._id, quantity: item.quantity, priceAtPurchase: product.price });
      total += product.price * item.quantity;
    }

    [order] = await Order.create([{ user: userId, items: orderItems, total }], { session });

    cart.items = [];
    await cart.save({ session });
  });

  session.endSession();
  return order;
}

async function cancel(userId, orderId) {
  const session = await mongoose.startSession();
  let order;

  await session.withTransaction(async () => {
    order = await Order.findOne({ _id: orderId, user: userId }).session(session);
    if (!order) {
      throw httpError(404, 'Order not found');
    }
    if (order.status === 'cancelled') {
      throw httpError(400, 'Order is already cancelled');
    }

    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } }, { session });
    }

    order.status = 'cancelled';
    await order.save({ session });
  });

  session.endSession();
  return order;
}

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

module.exports = { checkout, cancel };
