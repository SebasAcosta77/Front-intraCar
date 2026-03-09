const {
    findAllVehiculos,
    findVehiculoById,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    findVehiculosByAfiliado,
} = require('./vehiculos.repository.js');

const { findAfiliadoById } = require('../afiliados/afiliados.repository.js');

const getAll = async () => {
    return await findAllVehiculos();
};

const getById = async (id) => {
    const vehiculo = await findVehiculoById(id);
    if (!vehiculo) throw new Error(`Vehículo con id ${id} no encontrado`);
    return vehiculo;
};

const getByAfiliado = async (id_afiliado) => {
    return await findVehiculosByAfiliado(id_afiliado);
};

const create = async (data) => {
    // Verificar que el afiliado exista y sea titular
    const afiliado = await findAfiliadoById(data.id_afiliado);
    if (!afiliado) throw new Error(`Afiliado con id ${data.id_afiliado} no encontrado`);
    if (!afiliado.es_titular) throw new Error(`El afiliado ${data.id_afiliado} no es titular`);

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

module.exports = { getAll, getById, getByAfiliado, create, update, remove };