const Item = require('../models/item.model');

async function createItem(data) {
  return Item.create(data);
}

async function getItems() {
  return Item.find();
}

async function getItemById(id) {
  return Item.findById(id);
}

module.exports = { createItem, getItems, getItemById };
