const express = require('express');

const {handleGetMembers, handleGetCount, handleExportCSV, handlePostMember} = require('../controller/memberController.js');

const memberRoutes = express.Router();
memberRoutes.use(express.json());

memberRoutes.get('/', handleGetMembers);
memberRoutes.post('/', handlePostMember);
memberRoutes.get('/count', handleGetCount);
memberRoutes.get('/export/csv', handleExportCSV);

module.exports = memberRoutes;