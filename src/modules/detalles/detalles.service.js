const {
    findDetalleByAfiliado,
    findDetalleById,
    createDetalle,
    updateDetalle,
    deleteDetalle,
    findAllDetalles,
   
} = require('./detalles.repository.js');

const { findAfiliadoById } = require('../afiliados/afiliados.repository.js');

const getByAfiliado = async (id_afiliado) => {
    const detalle = await findDetalleByAfiliado(id_afiliado);
    if (!detalle) {
        throw new Error(`No se encontraron detalles para el afiliado ${id_afiliado}`);
    }
    return detalle;
};

const create = async (id_afiliado, data) => {
    // Verificar que el afiliado exista
    const afiliado = await findAfiliadoById(id_afiliado);
    if (!afiliado) {
        throw new Error(`Afiliado con id ${id_afiliado} no encontrado`);
    }

    // Verificar que no tenga detalles ya registrados (1:1)
    const existing = await findDetalleByAfiliado(id_afiliado);
    if (existing) {
        throw new Error(`El afiliado ${id_afiliado} ya tiene detalles registrados`);
    }

    return await createDetalle({
        ...data,
        id_afiliado,
    });
};

const update = async (id_afiliado, data) => {
    // Verificar que exista
    const existing = await findDetalleByAfiliado(id_afiliado);
    if (!existing) {
        throw new Error(`No se encontraron detalles para el afiliado ${id_afiliado}`);
    }
    return await updateDetalle(id_afiliado, data);
};

const remove = async (id_afiliado) => {
    const existing = await findDetalleByAfiliado(id_afiliado);
    if (!existing) {
        throw new Error(`No se encontraron detalles para el afiliado ${id_afiliado}`);
    }
    return await deleteDetalle(id_afiliado);
};

const getAll = async () => {
    return await findAllDetalles();
};

module.exports = { getByAfiliado, create, update, remove, getAll };