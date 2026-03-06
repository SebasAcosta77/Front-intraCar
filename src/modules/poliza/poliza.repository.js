const { AppDataSource } = require('../../database/data-source.js');

const getRepository = () => AppDataSource.getRepository('poliza');
const getConductoresRepository = () => AppDataSource.getRepository('poliza_conductores');

const findAllPolizas = async () => {
    const repo = getRepository();
    return await repo.find({
        relations: ['afiliado', 'backoffice', 'conductores', 'vehiculos'],
    });
};

const findPolizaById = async (id) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id },
        relations: [
            'afiliado',                    // titular
            'afiliado.detalles',           // detalles del titular
            'backoffice',                  // quien cotiza
            'conductores',                 // registros poliza_conductores
            'conductores.afiliado',        // datos de cada conductor
            'conductores.afiliado.detalles', // detalles de cada conductor
            'vehiculos',                   // vehículos de la póliza
        ],
    });
};

const findPolizasByAfiliado = async (id_afiliado) => {
    const repo = getRepository();
    return await repo.find({
        where: { id_afiliado },
        relations: ['afiliado', 'conductores', 'vehiculos'],
    });
};

const createPoliza = async (data) => {
    const repo = getRepository();
    const poliza = repo.create(data);
    return await repo.save(poliza);
};

const updatePoliza = async (id, data) => {
    const repo = getRepository();
    await repo.update(id, data);
    return await findPolizaById(id);
};

const addConductor = async (id_poliza, id_afiliado) => {
    const repo = getConductoresRepository();
    const conductor = repo.create({ id_poliza, id_afiliado });
    return await repo.save(conductor);
};

const removeConductor = async (id_poliza, id_afiliado) => {
    const repo = getConductoresRepository();
    return await repo.delete({ id_poliza, id_afiliado });
};

module.exports = {
    findAllPolizas,
    findPolizaById,
    findPolizasByAfiliado,
    createPoliza,
    updatePoliza,
    addConductor,
    removeConductor,
};