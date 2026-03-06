const { Router } = require('express');
const {
    getAllController,
    getByIdController,
    getByAgenteController,
    createController,
    updateController,
    deleteController,
    vincularController,
    conductoresDeTitularController,
    desvincularController
} = require('./afiliados.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');
const detallesRoutes = require('../detalles/detalles.routes.js');


const router = Router();

// Todas las rutas requieren JWT
router.use(authMiddleware);

// GET /api/v1/afiliados
router.get('/list/', getAllController);

// GET /api/v1/afiliados/:id
router.get('/listone/:id', getByIdController);

// GET /api/v1/afiliados/agente/:id_agente
router.get('/agente/:id_agente', getByAgenteController);

// POST /api/v1/afiliados  — solo Agente puede crear
router.post('/create/', roleMiddleware(1), createController);

// PUT /api/v1/afiliados/:id  — solo Agente puede editar
router.put('/update/:id', roleMiddleware(1), updateController);

// DELETE /api/v1/afiliados/:id  — solo Agente puede eliminar
router.delete('/delete/:id', roleMiddleware(1), deleteController);

router.post('/vincular/', roleMiddleware(1), vincularController);

router.delete('/desvincular/:id_titular/:id_conductor', desvincularController);


router.get('/:id_titular/conductores', conductoresDeTitularController);





//  Subrutas de detalles
router.use('/:id_afiliado/detalles', detallesRoutes);



module.exports = router;