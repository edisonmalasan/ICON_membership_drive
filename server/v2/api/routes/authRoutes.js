const express = require('express');

const { handleLogin } = require('../controller/authController.js');

const authRoutes = express.Router();
authRoutes.use(express.json());

authRoutes.post('/login', handleLogin);

module.exports = authRoutes;