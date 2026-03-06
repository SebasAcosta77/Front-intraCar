const {
    getAll,
    getById,
    getByPoliza,
    create,
    update,
    remove,
} = require('./vehiculos.service.js');

const getAllController = async (req, res) => {
    try {
        const vehiculos = await getAll();
        return res.status(200).json({ ok: true, data: vehiculos });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculo = await getById(Number(id));
        return res.status(200).json({ ok: true, data: vehiculo });
    } catch (error) {
        return res.status(404).json({ ok: false, message: error.message });
    }
};

const getByPolizaController = async (req, res) => {
    try {
        const { id_poliza } = req.params;
        const vehiculos = await getByPoliza(Number(id_poliza));
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
    getByPolizaController,
    createController,
    updateController,
    deleteController,
};