const express = require('express');

const { handleGetPayment, handlePostPayment, handlePutPayment} = require('../controller/paymentController.js');
const { validateToken } = require('../../middleware/authMiddleware.js');

const paymentRoutes = express.Router();
paymentRoutes.use(express.json());

paymentRoutes.get('/', validateToken('superuser','admin'), handleGetPayment);
paymentRoutes.post('/', validateToken('guest','admin','superuser'), handlePostPayment);
paymentRoutes.put('/', validateToken('admin','superuser'), handlePutPayment);

module.exports = paymentRoutes;