const {
    findAllCoberturas,
    findCoberturaById,
    findCoberturaByVehiculo,
    createCobertura,
    updateCobertura,
    deleteCobertura,
} = require('./cobertura.repository.js');

const { findVehiculoById } = require('../vehiculos/vehiculos.repository.js');

const verificarOwnership = (cobertura, user) => {
    if (user.role === 1 && cobertura.id_backoffice !== user.id) {
        throw new Error('No tienes permiso para acceder a esta cobertura');
    }
};

const getAll = async (user) => {
    if (user.role === 1) {
        return await findAllCoberturas({ id_backoffice: user.id });
    }
    return await findAllCoberturas();
};

const getById = async (id, user) => {
    const cobertura = await findCoberturaById(id);
    if (!cobertura) throw new Error(`Cobertura con id ${id} no encontrada`);
    verificarOwnership(cobertura, user);
    return cobertura;
};

const getByVehiculo = async (id_vehiculo, user) => {
    const cobertura = await findCoberturaByVehiculo(id_vehiculo);
    if (!cobertura) throw new Error(`No se encontró cobertura para el vehículo ${id_vehiculo}`);
    verificarOwnership(cobertura, user);
    return cobertura;
};

const create = async (data, id_agente) => {
    const vehiculo = await findVehiculoById(data.id_vehiculo);
    if (!vehiculo) throw new Error(`Vehículo con id ${data.id_vehiculo} no encontrado`);

    const existing = await findCoberturaByVehiculo(data.id_vehiculo);
    if (existing) throw new Error(`El vehículo ${data.id_vehiculo} ya tiene cobertura registrada`);

    return await createCobertura({
        ...data,
        id_backoffice: id_agente,
    });
};

const update = async (id, data, user) => {
    // Buscar por id de cobertura directamente
    const existing = await findCoberturaById(id);
    if (!existing) throw new Error(`Cobertura con id ${id} no encontrada`);
    verificarOwnership(existing, user);
    return await updateCobertura(existing.id_vehiculo, data);
};

const remove = async (id, user) => {
    const existing = await findCoberturaById(id);
    if (!existing) throw new Error(`Cobertura con id ${id} no encontrada`);
    verificarOwnership(existing, user);
    return await deleteCobertura(existing.id_vehiculo);
};

module.exports = { getAll, getById, getByVehiculo, create, update, remove };