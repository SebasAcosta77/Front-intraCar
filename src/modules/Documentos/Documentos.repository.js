const { AppDataSource } = require('../../database/data-source.js');

const getRepo = () => AppDataSource.getRepository('documentos');

// Todos los documentos con relaciones (backoffice)
const findAll = async () => {
    return await getRepo().find({
        relations: ['afiliado', 'user'],
        order: { fecha_carga: 'DESC' },
    });
};

// Documentos de un afiliado específico
const findByAfiliado = async (id_afiliado) => {
    return await getRepo().find({
        where: { id_afiliado: Number(id_afiliado) },
        relations: ['user'],
        order: { fecha_carga: 'DESC' },
    });
};

// Documentos de todos los afiliados de un agente
const findByAgente = async (id_agente) => {
    return await getRepo()
        .createQueryBuilder('doc')
        .leftJoinAndSelect('doc.afiliado', 'afiliado')
        .leftJoinAndSelect('doc.user', 'user')
        .where('afiliado.id_agente = :id_agente', { id_agente })
        .orderBy('doc.fecha_carga', 'DESC')
        .getMany();
};

// Un documento por id
const findById = async (id) => {
    return await getRepo().findOne({
        where: { id: Number(id) },
        relations: ['afiliado', 'user'],
    });
};

// Verificar si ya existe un documento del mismo tipo para el afiliado
const findByAfiliadoYTipo = async (id_afiliado, tipo_documento) => {
    return await getRepo().findOne({
        where: { id_afiliado: Number(id_afiliado), tipo_documento },
    });
};

// Crear
const createDocumento = async (data) => {
    const repo = getRepo();
    const doc = repo.create(data);
    return await repo.save(doc);
};

// Eliminar por id
const deleteDocumento = async (id) => {
    return await getRepo().delete(Number(id));
};

module.exports = {
    findAll,
    findByAfiliado,
    findByAgente,
    findById,
    findByAfiliadoYTipo,
    createDocumento,
    deleteDocumento,
};