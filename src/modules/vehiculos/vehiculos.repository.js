const { AppDataSource } = require('../../database/data-source.js');

const getRepository = () => AppDataSource.getRepository('vehiculos');

const findAllVehiculos = async () => {
    const repo = getRepository();
    return await repo.find({
        relations: ['afiliado', 'cobertura'],
        order: { id: 'DESC' },
    });
};

const findVehiculoById = async (id) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id },
        relations: ['afiliado', 'cobertura'],  // 
    });
};

const findVehiculosByAfiliado = async (id_afiliado) => {
    const repo = getRepository();
    return await repo.find({
        where: { id_afiliado },
        relations: ['afiliado', 'cobertura'],
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
    createVehiculo,
    updateVehiculo,
    deleteVehiculo,
    findVehiculosByAfiliado
};