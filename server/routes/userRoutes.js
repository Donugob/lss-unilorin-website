const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// Route for /api/users/register
router.post('/register', registerUser);

// Route for /api/users/login
router.post('/login', loginUser);

module.exports = router;