const express = require('express');

const memberRoutes = require('./api/routes/memberRoutes.js');
const authRoutes = require('./api/routes/authRoutes.js');
const paymentRoutes = require('./api/routes/paymentRoutes.js');

const v2Routes = express.Router();

v2Routes.use('/members', memberRoutes);
v2Routes.use('/auth', authRoutes);
v2Routes.use('/payments', paymentRoutes);


module.exports = v2Routes;