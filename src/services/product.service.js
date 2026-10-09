const Product = require('../models/product.model');

async function createProduct(data) {
  return Product.create(data);
}

async function getProducts() {
  return Product.find();
}

async function getProductById(id) {
  return Product.findById(id);
}

module.exports = { createProduct, getProducts, getProductById };
