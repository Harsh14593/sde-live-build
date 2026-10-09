const itemService = require('../services/item.service');

async function create(req, res, next) {
  try {
    const item = await itemService.createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
}

async function list(req, res, next) {
  try {
    const items = await itemService.getItems();
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const item = await itemService.getItemById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

module.exports = { create, list, getById };
