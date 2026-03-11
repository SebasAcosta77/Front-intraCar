const { Router } = require('express');
const { loginController, registerController, logoutController } = require('./auth.controller.js');
const { authMiddleware } = require('../../middlewares/auth.middleware.js');

const router = Router();

// POST /api/v1/auth/login
router.post('/login', loginController);

// POST /api/v1/auth/register
router.post('/register', registerController);

// POST /api/v1/auth/logout 
router.post('/logout', authMiddleware, logoutController);

module.exports = router;