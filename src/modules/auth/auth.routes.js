const { Router } = require('express');
const {
    loginController,
    registerController,
    logoutController,
    listarUsuariosController,
    actualizarUsuarioController,
    eliminarUsuarioController,
    cambiarEstadoUsuarioController,
} = require('./auth.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');

const router = Router();

// Públicas
router.post('/login', loginController);

// Protegidas
router.post('/logout',      authMiddleware,                       logoutController);
router.post('/register',   registerController);
router.get('/users',        authMiddleware, roleMiddleware(3),    listarUsuariosController);
router.put('/users/:id',    authMiddleware, roleMiddleware(3),    actualizarUsuarioController);
router.delete('/users/:id', authMiddleware, roleMiddleware(3),    eliminarUsuarioController);
router.patch('/users/:id/estado', authMiddleware, roleMiddleware(3), cambiarEstadoUsuarioController);

module.exports = router;