const { Router } = require('express');
const multer      = require('multer');
const {
    getAllController,
    getByAfiliadoController,
    getByAgenteController,
    uploadController,
    deleteController,
    uploadTextoController
    
    
} = require('./Documentos.controller.js');
const { authMiddleware, roleMiddleware } = require('../../middlewares/auth.middleware.js');

const router = Router();


const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB máximo
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp|pdf/i;
        if (allowed.test(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Solo se permiten imágenes (jpg, png, webp) y PDF'));
        }
    },
});

router.use(authMiddleware);

// GET  /api/v1/documentos/list                — Backoffice ve todos (rol 2)
router.get('/list', roleMiddleware(2), getAllController);

// GET  /api/v1/documentos/afiliado/:id_afiliado — Agente o Backoffice
router.get('/afiliado/:id_afiliado', getByAfiliadoController);

// GET  /api/v1/documentos/agente/:id_agente   — Solo agente ve los suyos (rol 1)
router.get('/agente/:id_agente', roleMiddleware(1), getByAgenteController);

// POST /api/v1/documentos/upload/:id_afiliado — Agente sube documento (rol 1)
router.post('/upload/:id_afiliado', roleMiddleware(1), upload.single('archivo'), uploadController);

// DELETE /api/v1/documentos/delete/:id        — Agente o Backoffice
router.delete('/delete/:id', deleteController);

// POST /api/v1/documentos/backoffice/upload/:id_afiliado — BackOffice sube cotizaciones (rol 2)
router.post('/backoffice/upload/:id_afiliado', roleMiddleware(2), upload.single('archivo'), uploadController);

router.post('/backoffice/texto/:id_afiliado', roleMiddleware(2), uploadTextoController);

module.exports = router;