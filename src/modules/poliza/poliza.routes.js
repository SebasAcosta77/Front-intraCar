const { Router } = require('express');
const {
    getAllController,
    getByIdController,
    getByAfiliadoController,
    createController,
    updateEstadoController,
    updateController,
} = require('./poliza.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');

const router = Router();

router.use(authMiddleware);

// GET /api/v1/polizas
router.get('/list', getAllController);

// GET /api/v1/polizas/:id
router.get('/listone/:id', getByIdController);

// GET /api/v1/polizas/afiliado/:id_afiliado
router.get('/afiliado/:id_afiliado', getByAfiliadoController);

// POST /api/v1/polizas  — Agente crea la póliza
router.post('/create', roleMiddleware(2, 3), createController);

// PUT /api/v1/polizas/:id  — Agente actualiza datos
router.put('/update/:id', roleMiddleware(2, 3), updateController);

// PATCH /api/v1/polizas/:id/estado  — BackOffice cambia estado
router.patch('/estado/:id', roleMiddleware(2, 3), updateEstadoController);

module.exports = router;