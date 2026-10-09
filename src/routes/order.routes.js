const express = require('express');
const requireAuth = require('../middleware/auth.middleware');
const controller = require('../controllers/order.controller');

const router = express.Router();

router.use(requireAuth);
router.post('/checkout', controller.checkout);
router.patch('/:id/cancel', controller.cancel);

module.exports = router;
