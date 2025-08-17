const express = require('express');

const {handleGetMembers, handleGetCount, handleExportCSV} = require('../controller/memberController.js');

const adminRoutes = express.Router();
adminRoutes.use(express.json());

adminRoutes.get('/members', handleGetMembers);
adminRoutes.post('/members', handlePostMember);
adminRoutes.get('/count', handleGetCount);
adminRoutes.get('/export/csv', handleExportCSV);

module.exports = adminRoutes;