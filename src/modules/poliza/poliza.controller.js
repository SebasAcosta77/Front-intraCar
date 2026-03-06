const {
    getAll,
    getById,
    getByAfiliado,
    create,
    updateEstado,
    update,
} = require('./poliza.service.js');

const getAllController = async (req, res) => {
    try {
        const polizas = await getAll();
        return res.status(200).json({ ok: true, data: polizas });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const poliza = await getById(Number(id));
        return res.status(200).json({ ok: true, data: poliza });
    } catch (error) {
        return res.status(404).json({ ok: false, message: error.message });
    }
};

const getByAfiliadoController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const polizas = await getByAfiliado(Number(id_afiliado));
        return res.status(200).json({ ok: true, data: polizas });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const createController = async (req, res) => {
    try {
        const poliza = await create(req.body, req.user.id);
        return res.status(201).json({
            ok: true,
            message: 'Póliza creada exitosamente',
            data: poliza,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const updateEstadoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        const poliza = await updateEstado(Number(id), estado, req.user.id);
        return res.status(200).json({
            ok: true,
            message: `Estado actualizado a: ${estado}`,
            data: poliza,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const poliza = await update(Number(id), req.body);
        return res.status(200).json({
            ok: true,
            message: 'Póliza actualizada exitosamente',
            data: poliza,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

module.exports = {
    getAllController,
    getByIdController,
    getByAfiliadoController,
    createController,
    updateEstadoController,
    updateController,
};