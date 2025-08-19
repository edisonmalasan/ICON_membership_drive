const express = require('express');

const {validateToken} = require('../../middleware/authMiddleware.js');

const {handleGetMembers, handleGetCount, handleExportCSV, handlePostMember} = require('../controller/memberController.js');

const memberRoutes = express.Router();
memberRoutes.use(express.json());

memberRoutes.get('/', validateToken('admin'), handleGetMembers);
memberRoutes.post('/', validateToken('guest','admin','superuser'), handlePostMember);
memberRoutes.get('/count', validateToken('guest'), handleGetCount);
memberRoutes.get('/export/csv', validateToken('admin'), handleExportCSV);

module.exports = memberRoutes;