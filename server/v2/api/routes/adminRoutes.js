const express = require('express');

const {handleGetMembers, handleGetCount, handleExportCSV} = require('../controller/adminController.js');

const adminRoutes = express.Router();
adminRoutes.use(express.json());

adminRoutes.get('/members', handleGetMembers);
adminRoutes.get('/count', handleGetCount);
adminRoutes.get('/export/csv', handleExportCSV);

module.exports = adminRoutes;