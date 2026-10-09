const express = require('express');
const requireAuth = require('../middleware/auth.middleware');
const controller = require('../controllers/cart.controller');

const router = express.Router();

router.use(requireAuth);
router.get('/', controller.getCart);
router.post('/items', controller.addItem);

module.exports = router;
