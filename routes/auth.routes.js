const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');
const authMiddleware = require('../utils/authMiddleware');

router.post('/register', AuthController.registration);
router.post('/login', AuthController.login);
router.get('/user', authMiddleware, AuthController.getUser);
router.delete('/logout', authMiddleware, AuthController.deleteSession);

module.exports = router;
