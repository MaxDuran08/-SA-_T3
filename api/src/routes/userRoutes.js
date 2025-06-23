// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getAllCIs);
router.get('/:id', userController.getCIById);
router.post('/', userController.createCI);
router.put('/', userController.updateCI);
router.delete('/', userController.deleteCI);

module.exports = router;