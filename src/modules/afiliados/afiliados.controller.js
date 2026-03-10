const {
    getAll,
    getById,
    getByAgente,
    create,
    update,
    remove,
    vincular,
    conductoresDeTitular,
    desvincular
} = require('./afiliados.service.js');

const getAllController = async (req, res) => {
    try {
        const afiliados = await getAll();
        return res.status(200).json({ ok: true, data: afiliados });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const getByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const afiliado = await getById(Number(id));
        return res.status(200).json({ ok: true, data: afiliado });
    } catch (error) {
        return res.status(404).json({ ok: false, message: error.message });
    }
};

const getByAgenteController = async (req, res) => {
    try {
        const { id_agente } = req.params;
        const afiliados = await getByAgente(Number(id_agente));
        return res.status(200).json({ ok: true, data: afiliados });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const createController = async (req, res) => {
    try {
        const id_agente = req.user.id;
        const afiliado = await create(req.body, id_agente);
        return res.status(201).json({
            ok: true,
            message: 'Afiliado creado exitosamente',
            data: afiliado,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const updateController = async (req, res) => {
    try {
        const { id } = req.params;
        const afiliado = await update(Number(id), req.body);
        return res.status(200).json({
            ok: true,
            message: 'Afiliado actualizado exitosamente',
            data: afiliado,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

// PATCH /api/v1/afiliados/estado/:id — actualiza solo estado y nota_estado
const patchEstadoController = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado, nota_estado } = req.body;

        if (!estado) {
            return res.status(400).json({ ok: false, message: 'estado es requerido' });
        }

        const afiliado = await update(Number(id), { estado, nota_estado: nota_estado ?? null });
        return res.status(200).json({
            ok: true,
            message: 'Estado actualizado exitosamente',
            data: afiliado,
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const deleteController = async (req, res) => {
    try {
        const { id } = req.params;
        await remove(Number(id));
        return res.status(200).json({
            ok: true,
            message: 'Afiliado eliminado exitosamente',
        });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const vincularController = async (req, res) => {
    try {
        const { id_titular, id_conductor } = req.body;
        if (!id_titular || !id_conductor)
            return res.status(400).json({ ok: false, message: 'id_titular e id_conductor son requeridos' });

        const result = await vincular(id_titular, id_conductor);
        return res.status(201).json({ ok: true, message: 'Conductor vinculado', data: result });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const conductoresDeTitularController = async (req, res) => {
    try {
        const { id_titular } = req.params;
        const result = await conductoresDeTitular(Number(id_titular));
        return res.status(200).json({ ok: true, data: result });
    } catch (error) {
        return res.status(404).json({ ok: false, message: error.message });
    }
};

const desvincularController = async (req, res) => {
    try {
        const { id_titular, id_conductor } = req.params;
        await desvincular(Number(id_titular), Number(id_conductor));
        return res.status(200).json({ ok: true, message: 'Conductor desvinculado' });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

module.exports = {
    getAllController,
    getByIdController,
    getByAgenteController,
    createController,
    updateController,
    patchEstadoController,
    deleteController,
    vincularController,
    conductoresDeTitularController,
    desvincularController
};