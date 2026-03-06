const { AppDataSource } = require('../../database/data-source.js');

const getRepository = () => AppDataSource.getRepository('vehiculos');

const findAllVehiculos = async () => {
    const repo = getRepository();
    return await repo.find({
        relations: ['poliza', 'cobertura'],
    });
};

const findVehiculoById = async (id) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id },
        relations: ['poliza', 'cobertura'],
    });
};

const findVehiculosByPoliza = async (id_poliza) => {
    const repo = getRepository();
    return await repo.find({
        where: { id_poliza },
        relations: ['cobertura'],
    });
};

const createVehiculo = async (data) => {
    const repo = getRepository();
    const vehiculo = repo.create(data);
    return await repo.save(vehiculo);
};

const updateVehiculo = async (id, data) => {
    const repo = getRepository();
    await repo.update(id, data);
    return await findVehiculoById(id);
};

const deleteVehiculo = async (id) => {
    const repo = getRepository();
    return await repo.delete(id);
};

module.exports = {
    findAllVehiculos,
    findVehiculoById,
    findVehiculosByPoliza,
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
};