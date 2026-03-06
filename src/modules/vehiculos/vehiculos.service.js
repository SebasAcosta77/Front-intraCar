const {
    findAllVehiculos,
    findVehiculoById,
    findVehiculosByPoliza,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
} = require('./vehiculos.repository.js');

const { findPolizaById } = require('../poliza/poliza.repository.js');

const getAll = async () => {
    return await findAllVehiculos();
};

const getById = async (id) => {
    const vehiculo = await findVehiculoById(id);
    if (!vehiculo) throw new Error(`Vehículo con id ${id} no encontrado`);
    return vehiculo;
};

const getByPoliza = async (id_poliza) => {
    return await findVehiculosByPoliza(id_poliza);
};

const create = async (data) => {
    // Verificar que la póliza exista y esté aceptada
    const poliza = await findPolizaById(data.id_poliza);
    if (!poliza) throw new Error(`Póliza con id ${data.id_poliza} no encontrada`);
    if (poliza.estado_poliza !== 'aceptada') {
        throw new Error(`La póliza debe estar en estado "aceptada" para registrar vehículos. Estado actual: ${poliza.estado_poliza}`);
    }

    return await createVehiculo(data);
};

const update = async (id, data) => {
    await getById(id);
    return await updateVehiculo(id, data);
};

const remove = async (id) => {
    await getById(id);
    return await deleteVehiculo(id);
};

module.exports = { getAll, getById, getByPoliza, create, update, remove };