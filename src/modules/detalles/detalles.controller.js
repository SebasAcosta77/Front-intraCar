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
        const detalle = await getByAfiliado(Number(id_afiliado));
        return res.status(200).json({ ok: true, data: detalle });
    } catch (error) {
        return res.status(404).json({ ok: false, message: error.message });
    }
};

const createController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const detalle = await create(Number(id_afiliado), req.body);
        return res.status(201).json({
            ok: true,
            message: 'Detalles registrados exitosamente',
            data: detalle,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const updateController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const detalle = await update(Number(id_afiliado), req.body);
        return res.status(200).json({
            ok: true,
            message: 'Detalles actualizados exitosamente',
            data: detalle,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const deleteController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        await remove(Number(id_afiliado));
        return res.status(200).json({
            ok: true,
            message: 'Detalles eliminados exitosamente',
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const getAllController = async (req, res) => {
    try {
        const detalles = await getAll();
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