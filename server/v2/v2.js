const express = require('express');

const memberRoutes = require('./api/routes/memberRoutes.js');

const v2Routes = express.Router();

v2Routes.use('/members', memberRoutes);

module.exports = v2Routes;