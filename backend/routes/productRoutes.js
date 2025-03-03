const express = require('express')
const router = express.Router()
const { authenticateToken } = require('../middleware/auth');
const { createProduct, editProduct, deleteProduct, getAllProducts, getProduct } = require('../controllers/productController')

router.post('/products', authenticateToken, createProduct);

router.put('/products/:id', authenticateToken, editProduct);

router.delete('/products/:id', authenticateToken, deleteProduct);

router.get('/products', authenticateToken, getAllProducts);

router.get('/products/:id', authenticateToken, getProduct);

module.exports = router