const express = require('express');
const controller = require('../controllers/item.controller');

const router = express.Router();

router.post('/', controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getById);

module.exports = router;
