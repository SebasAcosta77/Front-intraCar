const {
    findAllAfiliados,
    findAfiliadoById,
    findAfiliadosByAgente,
    createAfiliado,
    updateAfiliado,
    deleteAfiliado,
} = require('./afiliados.repository.js');
const {
    vincularConductor,
    getConductoresDeTitular,
    getTitularDeConductor,
    desvincularConductor,
} = require('./conductor-titular.repository.js');

const getAll = async () => {
    return await findAllAfiliados();
};

const getById = async (id) => {
    const afiliado = await findAfiliadoById(id);
    if (!afiliado) {
        throw new Error(`Afiliado con id ${id} no encontrado`);
    }
    return afiliado;
};

const getByAgente = async (id_agente) => {
    return await findAfiliadosByAgente(id_agente);
};

const create = async (data, id_agente) => {
    // Validaciones
    if (!data.nombres || !data.apellidos) {
        throw new Error('Nombres y apellidos son requeridos');
    }

    return await createAfiliado({
        ...data,
        id_agente: id_agente ?? null, 
        es_titular: data.es_titular ?? 1,
    });
};

const update = async (id, data) => {
    console.log('UPDATE data recibida:', data); // ← agrega esto
    await getById(id);
    return await updateAfiliado(id, data);
};

const remove = async (id) => {
    await getById(id); // valida que exista
    return await deleteAfiliado(id);
};

const vincular = async (id_titular, id_conductor) => {
    await getById(id_titular);
    await getById(id_conductor);

    const titular = await getById(id_titular);
    if (titular.es_titular !== 1)
        throw new Error('El afiliado indicado no es titular');

    const conductor = await getById(id_conductor);
    if (conductor.es_titular !== 0)
        throw new Error('El afiliado indicado no es conductor');

    return await vincularConductor(id_titular, id_conductor);
};

//  Obtener conductores de un titular
const conductoresDeTitular = async (id_titular) => {
    await getById(id_titular);
    return await getConductoresDeTitular(id_titular);
};

//  Obtener titular de un conductor
const titularDeConductor = async (id_conductor) => {
    await getById(id_conductor);
    return await getTitularDeConductor(id_conductor);
};

//  Desvincular
const desvincular = async (id_titular, id_conductor) => {
    return await desvincularConductor(id_titular, id_conductor);
};

module.exports = { getAll, getById, getByAgente, create, update, remove,  vincular, conductoresDeTitular,
  titularDeConductor, desvincular };