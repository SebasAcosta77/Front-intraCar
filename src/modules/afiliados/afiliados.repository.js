const { AppDataSource } = require('../../database/data-source.js');

const getRepository = () => AppDataSource.getRepository('afiliados');

const findAllAfiliados = async () => {
    const repo = getRepository();
    return await repo.find({
        relations: ['agente'],
        order: { created_at: 'DESC' },
    });
};

const findAfiliadoById = async (id) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id },
        relations: ['agente', 'detalles'],
    });
};

const findAfiliadosByAgente = async (id_agente) => {
    const repo = getRepository();
    return await repo.find({
        where: { id_agente },
        relations: ['detalles'],
    });
};

const createAfiliado = async (data) => {
    const repo = getRepository();
    const afiliado = repo.create(data);
    return await repo.save(afiliado);
};

const updateAfiliado = async (id, data) => {
    const repo = getRepository();
    await repo.update(id, data);
    return await findAfiliadoById(id);
};

const deleteAfiliado = async (id) => {
    const repo = getRepository();
    return await repo.delete(id);
};

module.exports = {
    findAllAfiliados,
    findAfiliadoById,
    findAfiliadosByAgente,
    createAfiliado,
    updateAfiliado,
    deleteAfiliado,
};