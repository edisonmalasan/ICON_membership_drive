const express = require('express');

const memberRoutes = require('./api/routes/memberRoutes.js');
const authRoutes = require('./api/routes/authRoutes.js');

const v2Routes = express.Router();

v2Routes.use('/members', memberRoutes);
v2Routes.use('/auth', authRoutes);


module.exports = v2Routes;