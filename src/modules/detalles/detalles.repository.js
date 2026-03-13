const { AppDataSource } = require('../../database/data-source.js');

const getRepository = () => AppDataSource.getRepository('detalles');

const findDetalleByAfiliado = async (id_afiliado) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id_afiliado },
        relations: ['afiliado'],
    });
};

const findDetalleById = async (id) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { id },
        relations: ['afiliado'],
    });
};

const createDetalle = async (data) => {
    const repo = getRepository();
    const detalle = repo.create(data);
    return await repo.save(detalle);
};

const updateDetalle = async (id_afiliado, data) => {
    const repo = getRepository();
    await repo.update({ id_afiliado }, data);
    return await findDetalleByAfiliado(id_afiliado);
};

const deleteDetalle = async (id_afiliado) => {
    const repo = getRepository();
    return await repo.delete({ id_afiliado });
};

const findAllDetalles = async (filtro = {}) => {
    const repo = getRepository();

    // Si viene filtro de agente, necesitamos filtrar por la relación afiliado.id_agente
    if (filtro.id_agente) {
        return await repo.find({
            relations: ['afiliado'],
            where: {
                afiliado: {
                    id_agente: filtro.id_agente,
                    es_titular: 1  // solo titulares
                }
            },
            order: { id: 'DESC' },
        });
    }

    // BackOffice y SuperUsuario: todo
    return await repo.find({
        relations: ['afiliado'],
        order: { id: 'DESC' },
    });
};

module.exports = {
    findDetalleByAfiliado,
    findDetalleById,
    createDetalle,
    updateDetalle,
    deleteDetalle,
    findAllDetalles,
};