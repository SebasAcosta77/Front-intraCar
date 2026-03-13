const {
    findDetalleByAfiliado,
    findDetalleById,
    createDetalle,
    updateDetalle,
    deleteDetalle,
    findAllDetalles,
} = require('./detalles.repository.js');

const { findAfiliadoById } = require('../afiliados/afiliados.repository.js');

// Helper: solo restringe si es Agente (role 1)
const verificarOwnership = (afiliado, user) => {
    if (user.role === 1 && afiliado.id_agente !== user.id) {
        throw new Error('No tienes permiso para acceder a los detalles de este afiliado');
    }
};

const getByAfiliado = async (id_afiliado, user) => {
    const detalle = await findDetalleByAfiliado(id_afiliado);
    if (!detalle) {
        throw new Error(`No se encontraron detalles para el afiliado ${id_afiliado}`);
    }
    verificarOwnership(detalle.afiliado, user);
    return detalle;
};

const create = async (id_afiliado, data, user) => {
    const afiliado = await findAfiliadoById(id_afiliado);
    if (!afiliado) {
        throw new Error(`Afiliado con id ${id_afiliado} no encontrado`);
    }

    verificarOwnership(afiliado, user);

    const existing = await findDetalleByAfiliado(id_afiliado);
    if (existing) {
        throw new Error(`El afiliado ${id_afiliado} ya tiene detalles registrados`);
    }

    return await createDetalle({ ...data, id_afiliado });
};

const update = async (id_afiliado, data, user) => {
    const existing = await findDetalleByAfiliado(id_afiliado);
    if (!existing) {
        throw new Error(`No se encontraron detalles para el afiliado ${id_afiliado}`);
    }
    verificarOwnership(existing.afiliado, user);
    return await updateDetalle(id_afiliado, data);
};

const remove = async (id_afiliado, user) => {
    const existing = await findDetalleByAfiliado(id_afiliado);
    if (!existing) {
        throw new Error(`No se encontraron detalles para el afiliado ${id_afiliado}`);
    }
    verificarOwnership(existing.afiliado, user);
    return await deleteDetalle(id_afiliado);
};

const getAll = async (user) => {
    if (user.role === 1) {
        return await findAllDetalles({ id_agente: user.id });
    }
    return await findAllDetalles();
};

module.exports = { getByAfiliado, create, update, remove, getAll };