const {
    getAll,
    getById,
    getByVehiculo,
    create,
    update,
    remove,
} = require('./cobertura.service.js');

const getAllController = async (req, res) => {
    try {
        const coberturas = await getAll(req.user);
        return res.status(200).json({ ok: true, data: coberturas });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const cobertura = await getById(Number(id), req.user); // 
        return res.status(200).json({ ok: true, data: cobertura });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 404;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

const getByVehiculoController = async (req, res) => {
    try {
        const { id_vehiculo } = req.params;
        const cobertura = await getByVehiculo(Number(id_vehiculo), req.user); // 
        return res.status(200).json({ ok: true, data: cobertura });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 404;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

const createController = async (req, res) => {
    try {
        const cobertura = await create(req.body, req.user.id); // 
        return res.status(201).json({
            ok: true,
            message: 'Cobertura registrada exitosamente',
            data: cobertura,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const updateController = async (req, res) => {
    try {
        const { id_vehiculo } = req.params;
        const cobertura = await update(Number(id_vehiculo), req.body, req.user); //
        return res.status(200).json({
            ok: true,
            message: 'Cobertura actualizada exitosamente',
            data: cobertura,
        });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 400;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

const deleteController = async (req, res) => {
    try {
        const { id_vehiculo } = req.params;
        await remove(Number(id_vehiculo), req.user); 
        return res.status(200).json({
            ok: true,
            message: 'Cobertura eliminada exitosamente',
        });
    } catch (error) {
        const status = error.message.includes('permiso') ? 403 : 400;
        return res.status(status).json({ ok: false, message: error.message });
    }
};

module.exports = {
    getAllController,
    getByIdController,
    getByVehiculoController,
    createController,
    updateController,
    deleteController,
};