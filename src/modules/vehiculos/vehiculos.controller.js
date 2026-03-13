const {
    getAll,
    getById,
    create,
    update,
    remove,
    getByAfiliado,
    getByAgente,
} = require('./vehiculos.service.js');



const getAllController = async (req, res) => {
    try {
        const { id, role } = req.user;
        const vehiculos = role === 1
            ? await getByAgente(id)
            : await getAll();
        return res.status(200).json({ ok: true, data: vehiculos });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculo = await getById(Number(id));
        if (req.user.role === 1 && vehiculo.afiliado?.id_agente !== req.user.id) {
            return res.status(403).json({ ok: false, message: 'No autorizado para ver este vehículo' });
        }
        return res.status(200).json({ ok: true, data: vehiculo });
    } catch (error) {
        return res.status(404).json({ ok: false, message: error.message });
    }
};

const getByAfiliadoController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const vehiculos = await getByAfiliado(Number(id_afiliado));
        return res.status(200).json({ ok: true, data: vehiculos });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const createController = async (req, res) => {
    try {
        const vehiculo = await create(req.body);
        return res.status(201).json({
            ok: true,
            message: 'Vehículo registrado exitosamente',
            data: vehiculo,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculo = await update(Number(id), req.body);
        return res.status(200).json({
            ok: true,
            message: 'Vehículo actualizado exitosamente',
            data: vehiculo,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        await remove(Number(id));
        return res.status(200).json({
            ok: true,
            message: 'Vehículo eliminado exitosamente',
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

module.exports = {
    getAllController,
    getByIdController,
    createController,
    updateController,
    deleteController,
    getByAfiliadoController
};