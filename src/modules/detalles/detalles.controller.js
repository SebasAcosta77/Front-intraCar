const {
    getByAfiliado,
    create,
    update,
    remove,
    getAll, 
} = require('./detalles.service.js');

const getByAfiliadoController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const detalle = await getByAfiliado(Number(id_afiliado), req.user); // 
        return res.status(200).json({ ok: true, data: detalle });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 404;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

const createController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const detalle = await create(Number(id_afiliado), req.body, req.user); // 
        return res.status(201).json({
            ok: true,
            message: 'Detalles registrados exitosamente',
            data: detalle,
        });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 400;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

const updateController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const detalle = await update(Number(id_afiliado), req.body, req.user); //
        return res.status(200).json({
            ok: true,
            message: 'Detalles actualizados exitosamente',
            data: detalle,
        });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 400;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

const deleteController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        await remove(Number(id_afiliado), req.user); //
        return res.status(200).json({
            ok: true,
            message: 'Detalles eliminados exitosamente',
        });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 400;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

const getAllController = async (req, res) => {
    try {
        const detalles = await getAll(req.user);
        return res.status(200).json({ ok: true, data: detalles });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports = {
    getByAfiliadoController,
    createController,
    updateController,
    deleteController,
    getAllController,
};