const { AppDataSource } = require('../../database/data-source.js');

const getRepo = () => AppDataSource.getRepository('conductor_titular');

// Vincular conductor a titular
const vincularConductor = async (id_titular, id_conductor) => {
    const repo = getRepo();
    const existe = await repo.findOne({ where: { id_titular, id_conductor } });
    if (existe) return existe;
    const rel = repo.create({ id_titular, id_conductor });
    return await repo.save(rel);
};

// Obtener todos los conductores de un titular
const getConductoresDeTitular = async (id_titular) => {
    const repo = getRepo();
    return await repo.find({
        where: { id_titular },
        relations: ['conductor'],
    });
};

// Obtener el titular de un conductor
const getTitularDeConductor = async (id_conductor) => {
    const repo = getRepo();
    return await repo.findOne({
        where: { id_conductor },
        relations: ['titular'],
    });
};

// Desvincular conductor
const desvincularConductor = async (id_titular, id_conductor) => {
    const repo = getRepo();
    return await repo.delete({ id_titular, id_conductor });
};

module.exports = {
    vincularConductor,
    getConductoresDeTitular,
    getTitularDeConductor,
    desvincularConductor,
};