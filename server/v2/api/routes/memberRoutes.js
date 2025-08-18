const express = require('express');

const {validateToken} = require('../../middleware/authMiddleware.js');

const {handleGetMembers, handleGetCount, handleExportCSV, handlePostMember} = require('../controller/memberController.js');

const memberRoutes = express.Router();
memberRoutes.use(express.json());

memberRoutes.get('/', validateToken, handleGetMembers);
memberRoutes.post('/', handlePostMember);
memberRoutes.get('/count', handleGetCount);
memberRoutes.get('/export/csv', validateToken, handleExportCSV);

module.exports = memberRoutes;