const { Router } = require('express');
const {
    getAllController,
    getByIdController,
    createController,
    updateController,
    deleteController,
    getByAfiliadoController,
} = require('./vehiculos.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');

const router = Router();

router.use(authMiddleware);

// GET /api/v1/vehiculos/list
router.get('/list', getAllController);

// GET /api/v1/vehiculos/listone/:id
router.get('/listone/:id', getByIdController);

router.get('/afiliado/:id_afiliado', getByAfiliadoController);

// POST /api/v1/vehiculos/create — Agente
router.post('/create', roleMiddleware(1), createController);

// PUT /api/v1/vehiculos/update/:id — Agente
router.put('/update/:id', roleMiddleware(1), updateController);

// DELETE /api/v1/vehiculos/delete/:id — Agente
router.delete('/delete/:id', roleMiddleware(1), deleteController);

module.exports = router;