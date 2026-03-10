const { getAll, getByAfiliado, getByAgente, getById, upload, remove, uploadTexto } = require('./Documentos.service');

// GET /api/v1/documentos/list  — backoffice ve todos
const getAllController = async (req, res) => {
    try {
        const docs = await getAll();
        return res.status(200).json({ ok: true, data: docs });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
};

// GET /api/v1/documentos/afiliado/:id_afiliado
const getByAfiliadoController = async (req, res) => {
    try {
        const docs = await getByAfiliado(Number(req.params.id_afiliado));
        return res.status(200).json({ ok: true, data: docs });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
};

// GET /api/v1/documentos/agente/:id_agente  — agente ve solo sus afiliados
const getByAgenteController = async (req, res) => {
    try {
        const docs = await getByAgente(Number(req.params.id_agente));
        return res.status(200).json({ ok: true, data: docs });
    } catch (err) {
        return res.status(500).json({ ok: false, message: err.message });
    }
};

// POST /api/v1/documentos/upload/:id_afiliado  — sube archivo (multipart/form-data)
// Body: tipo_documento (string), obligatorio (0|1)
// File: campo "archivo"
const uploadController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const { tipo_documento, obligatorio } = req.body;
        const archivo = req.file;

        if (!tipo_documento) {
            return res.status(400).json({ ok: false, message: 'tipo_documento es requerido' });
        }
        if (!archivo) {
            return res.status(400).json({ ok: false, message: 'No se recibió ningún archivo' });
        }

        const doc = await upload(
            Number(id_afiliado),
            req.user.id,
            tipo_documento,
            archivo,
            obligatorio ?? 1,
        );

        return res.status(201).json({
            ok: true,
            message: 'Documento cargado correctamente',
            data: doc,
        });
    } catch (err) {
        return res.status(400).json({ ok: false, message: err.message });
    }
};

// DELETE /api/v1/documentos/delete/:id
const deleteController = async (req, res) => {
    try {
        await remove(Number(req.params.id));
        return res.status(200).json({ ok: true, message: 'Documento eliminado' });
    } catch (err) {
        return res.status(400).json({ ok: false, message: err.message });
    }
};

const uploadTextoController = async (req, res) => {
    try {
        const { id_afiliado } = req.params;
        const { tipo_documento, texto } = req.body;

        if (!tipo_documento) return res.status(400).json({ ok: false, message: 'tipo_documento es requerido' });
        if (!texto)          return res.status(400).json({ ok: false, message: 'texto es requerido' });

        const doc = await uploadTexto(
            Number(id_afiliado),
            req.user.id,
            tipo_documento,
            texto,
            0,
        );

        return res.status(201).json({ ok: true, message: 'Guardado correctamente', data: doc });
    } catch (err) {
        return res.status(400).json({ ok: false, message: err.message });
    }
};

module.exports = {
    getAllController,
    getByAfiliadoController,
    getByAgenteController,
    uploadController,
    deleteController,
    uploadTextoController
};