const { Router } = require('express');
const {
    getByAfiliadoController,
    createController,
    updateController,
    deleteController,
    getAllController,
} = require('./detalles.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');

const router = Router({ mergeParams: true }); 

// Todas las rutas requieren JWT
router.use(authMiddleware);

// GET /api/v1/afiliados/:id_afiliado/detalles
router.get('/', getByAfiliadoController);

// POST /api/v1/afiliados/:id_afiliado/detalles
router.post('/', roleMiddleware(1), createController);

// PUT /api/v1/afiliados/:id_afiliado/detalles
router.put('/', roleMiddleware(1), updateController);

// DELETE /api/v1/afiliados/:id_afiliado/detalles
router.delete('/', roleMiddleware(1), deleteController);

router.get('/list', getAllController);

module.exports = router;