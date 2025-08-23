const express = require('express');

const {validateToken} = require('../../middleware/authMiddleware.js');

const {handlePutMember, handleGetMembers, handleGetCount, handleExportCSV, handlePostMember} = require('../controller/memberController.js');

const memberRoutes = express.Router();
memberRoutes.use(express.json());

memberRoutes.get('/', validateToken('admin'), handleGetMembers);
memberRoutes.post('/', validateToken('guest','admin','superuser'), handlePostMember);
memberRoutes.put('/:id', validateToken('admin','superuser'), handlePutMember)
memberRoutes.get('/count', validateToken('guest'), handleGetCount);
memberRoutes.get('/export/csv', validateToken('admin'), handleExportCSV);

module.exports = memberRoutes;