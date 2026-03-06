const { Router } = require('express');
const {
    getAllController,
    getByIdController,
    getByVehiculoController,
    createController,
    updateController,
    deleteController,
} = require('./cobertura.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');

const router = Router();

router.use(authMiddleware);

// GET /api/v1/coberturas/list
router.get('/list', getAllController);

// GET /api/v1/coberturas/listone/:id
router.get('/listone/:id', getByIdController);

// GET /api/v1/coberturas/vehiculo/:id_vehiculo
router.get('/vehiculo/:id_vehiculo', getByVehiculoController);

// POST /api/v1/coberturas/create — solo BackOffice
router.post('/create', roleMiddleware(1), createController);

// PUT /api/v1/coberturas/update/:id_vehiculo — solo BackOffice
router.put('/update/:id_vehiculo', roleMiddleware(1), updateController);

// DELETE /api/v1/coberturas/delete/:id_vehiculo — solo BackOffice
router.delete('/delete/:id_vehiculo', roleMiddleware(1), deleteController);

module.exports = router;