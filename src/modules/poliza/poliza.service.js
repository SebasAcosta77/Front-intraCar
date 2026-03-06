const {
    findAllPolizas,
    findPolizaById,
    findPolizasByAfiliado,
    createPoliza,
    updatePoliza,
    addConductor,
    removeConductor,
} = require('./poliza.repository.js');

const { findAfiliadoById } = require('../afiliados/afiliados.repository.js');

const getAll = async () => {
    return await findAllPolizas();
};

const getById = async (id) => {
    const poliza = await findPolizaById(id);
    if (!poliza) throw new Error(`Póliza con id ${id} no encontrada`);
    return poliza;
};

const getByAfiliado = async (id_afiliado) => {
    return await findPolizasByAfiliado(id_afiliado);
};

const create = async (data, id_backoffice) => {
    // Verificar que el titular exista
    const titular = await findAfiliadoById(data.id_afiliado);
    if (!titular) throw new Error(`Afiliado titular con id ${data.id_afiliado} no encontrado`);
    if (!titular.es_titular) throw new Error(`El afiliado ${data.id_afiliado} no es titular`);

    // Crear póliza
    const poliza = await createPoliza({
        id_afiliado: data.id_afiliado,
        id_backoffice: id_backoffice,
        estado_poliza: 'cotizando',
        poliza_anterior: data.poliza_anterior,
        tiempo_poliza_anterior: data.tiempo_poliza_anterior,
        fecha_vencimiento_poliza_anterior: data.fecha_vencimiento_poliza_anterior,
        plazo_poliza_anterior: data.plazo_poliza_anterior,
        plazo_poliza_nueva: data.plazo_poliza_nueva,
        fecha_inicio_nueva: data.fecha_inicio_nueva,
    });

    // Vincular conductores adicionales si los hay
    if (data.conductores && data.conductores.length > 0) {
        for (const id_conductor of data.conductores) {
            const conductor = await findAfiliadoById(id_conductor);
            if (!conductor) throw new Error(`Conductor con id ${id_conductor} no encontrado`);
            await addConductor(poliza.id, id_conductor);
        }
    }

    return await findPolizaById(poliza.id);
};

const updateEstado = async (id, estado, id_backoffice) => {
    const estados = ['cotizando', 'cotizada', 'aceptada', 'rechazada', 'vigente', 'vencida'];
    if (!estados.includes(estado)) {
        throw new Error(`Estado inválido. Debe ser: ${estados.join(', ')}`);
    }
    await getById(id); // valida que exista
    return await updatePoliza(id, { estado_poliza: estado, id_backoffice });
};

const update = async (id, data) => {
    await getById(id);
    return await updatePoliza(id, data);
};

module.exports = { getAll, getById, getByAfiliado, create, updateEstado, update };