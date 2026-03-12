const { Router } = require('express');
const {
    getAllController,
    getByIdController,
    getByAgenteController,
    createController,
    updateController,
    patchEstadoController,
    deleteController,
    vincularController,
    conductoresDeTitularController,
    desvincularController
} = require('./afiliados.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');
const detallesRoutes = require('../detalles/detalles.routes.js');

const router = Router();

router.use(authMiddleware);

router.get('/list/', getAllController);
router.get('/listone/:id', getByIdController);
router.get('/agente/:id_agente', getByAgenteController);

router.post('/create/', roleMiddleware(1, 3), createController);

// PUT — edición completa (agente edita datos del afiliado)
router.put('/update/:id', roleMiddleware(1, 2, 3), updateController);

// PATCH — solo actualiza estado y nota_estado (agente o backoffice)
router.patch('/estado/:id', roleMiddleware(1, 2, 3), patchEstadoController);

router.delete('/delete/:id', roleMiddleware(1, 3), deleteController);

router.post('/vincular/', roleMiddleware(1, 3), vincularController);
router.delete('/desvincular/:id_titular/:id_conductor', desvincularController);
router.get('/:id_titular/conductores', conductoresDeTitularController);

// Subrutas de detalles
router.use('/:id_afiliado/detalles', detallesRoutes);

module.exports = router;