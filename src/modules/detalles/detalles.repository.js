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

const findAllDetalles = async () => {
    const repo = getRepository();
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