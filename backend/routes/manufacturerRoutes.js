const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/auth');
const { createManufacturer, editManufacturer, deleteManufacturer, getAllManufacturers, getManufacturer } = require('../controllers/manufacturerController')

router.post('/manufacturers', authenticateToken, createManufacturer);

router.put('/manufacturers/:id', authenticateToken, editManufacturer);

router.delete('/manufacturers/:id', authenticateToken, deleteManufacturer);

router.get('/manufacturers', authenticateToken, getAllManufacturers);

router.get('/manufacturers/:id', authenticateToken, getManufacturer);

module.exports = router