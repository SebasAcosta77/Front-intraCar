const { AppDataSource } = require('../../database/data-source.js');

const getRepository = () => AppDataSource.getRepository('cobertura');

const findAllCoberturas = async () => {
    const repo = getRepository();
    return await repo.find({
        relations: ['vehiculo', 'backoffice'],
    });
};

const findCoberturaById = async (id) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id },
        relations: ['vehiculo', 'backoffice'],
    });
};

const findCoberturaByVehiculo = async (id_vehiculo) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id_vehiculo },
        relations: ['vehiculo', 'backoffice'],
    });
};

const createCobertura = async (data) => {
    const repo = getRepository();
    const cobertura = repo.create(data);
    return await repo.save(cobertura);
};

const updateCobertura = async (id_vehiculo, data) => {
    const repo = getRepository();
    await repo.update({ id_vehiculo }, data);
    return await findCoberturaByVehiculo(id_vehiculo);
};

const deleteCobertura = async (id_vehiculo) => {
    const repo = getRepository();
    return await repo.delete({ id_vehiculo });
};

module.exports = {
    findAllCoberturas,
    findCoberturaById,
    findCoberturaByVehiculo,
    createCobertura,
    updateCobertura,
    deleteCobertura,
};