const express = require('express')
const router = express.Router()
const { loginUser, registerUser, getAllUsers, getUser } = require('../controllers/userController')
const { authenticateToken } = require('../middleware/auth')

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/users', authenticateToken, getAllUsers);

router.get('/users/:id', authenticateToken, getUser);

module.exports = router;