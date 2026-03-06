const {
    findAllCoberturas,
    findCoberturaById,
    findCoberturaByVehiculo,
    createCobertura,
    updateCobertura,
    deleteCobertura,
} = require('./cobertura.repository.js');

const { findVehiculoById } = require('../vehiculos/vehiculos.repository.js');

const getAll = async () => {
    return await findAllCoberturas();
};

const getById = async (id) => {
    const cobertura = await findCoberturaById(id);
    if (!cobertura) throw new Error(`Cobertura con id ${id} no encontrada`);
    return cobertura;
};

const getByVehiculo = async (id_vehiculo) => {
    const cobertura = await findCoberturaByVehiculo(id_vehiculo);
    if (!cobertura) throw new Error(`No se encontró cobertura para el vehículo ${id_vehiculo}`);
    return cobertura;
};

const create = async (data, id_agente) => {
    // Verificar que el vehículo exista
    const vehiculo = await findVehiculoById(data.id_vehiculo);
    if (!vehiculo) throw new Error(`Vehículo con id ${data.id_vehiculo} no encontrado`);

    // Verificar que no tenga cobertura ya (1:1)
    const existing = await findCoberturaByVehiculo(data.id_vehiculo);
    if (existing) throw new Error(`El vehículo ${data.id_vehiculo} ya tiene cobertura registrada`);

    return await createCobertura({
        ...data,
        id_backoffice: id_agente,
    });
};

const update = async (id_vehiculo, data) => {
    const existing = await findCoberturaByVehiculo(id_vehiculo);
    if (!existing) throw new Error(`No se encontró cobertura para el vehículo ${id_vehiculo}`);
    return await updateCobertura(id_vehiculo, data);
};

const remove = async (id_vehiculo) => {
    const existing = await findCoberturaByVehiculo(id_vehiculo);
    if (!existing) throw new Error(`No se encontró cobertura para el vehículo ${id_vehiculo}`);
    return await deleteCobertura(id_vehiculo);
};

module.exports = { getAll, getById, getByVehiculo, create, update, remove };