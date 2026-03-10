const path = require('path');
const fs   = require('fs');
const {
    findAll,
    findByAfiliado,
    findByAgente,
    findById,
    findByAfiliadoYTipo,
    createDocumento,
    deleteDocumento,
} = require('./Documentos.repository');


// Las imágenes se guardan en: /uploads/documentos/<id_afiliado>/
const UPLOAD_BASE = path.join(__dirname, '..', '..', '..', 'uploads', 'documentos');

const getUploadDir = (id_afiliado) => {
    const dir = path.join(UPLOAD_BASE, String(id_afiliado));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
};

// ─── Servicios ────────────────────────────────────────────────────────────────

const getAll = async () => findAll();

const getByAfiliado = async (id_afiliado) => findByAfiliado(id_afiliado);

const getByAgente = async (id_agente) => findByAgente(id_agente);

const getById = async (id) => {
    const doc = await findById(id);
    if (!doc) throw new Error(`Documento ${id} no encontrado`);
    return doc;
};

/**
 * Sube un documento para un afiliado.
 * Si ya existe un documento del mismo tipo, reemplaza el archivo y el registro.
 *
 * @param {number} id_afiliado
 * @param {number} id_user       - ID del usuario que sube (agente)
 * @param {string} tipo_documento - Ej: 'declaration_page_1', 'licencia_1'
 * @param {object} archivo        - Objeto multer (buffer, originalname, mimetype)
 * @param {number} obligatorio    - 1 = requerido, 0 = opcional
 */
const upload = async (id_afiliado, id_user, tipo_documento, archivo, obligatorio = 1) => {
    if (!archivo) throw new Error('No se recibió ningún archivo');

    const uploadDir = getUploadDir(id_afiliado);

    // Si ya existe uno del mismo tipo → eliminar archivo físico anterior
    const existing = await findByAfiliadoYTipo(id_afiliado, tipo_documento);
    if (existing) {
        const rutaAnterior = path.join(__dirname, '..', '..', '..', existing.ruta_archivo);
        if (fs.existsSync(rutaAnterior)) fs.unlinkSync(rutaAnterior);
        await deleteDocumento(existing.id);
    }

    // Construir nombre único y ruta relativa
    const ext          = path.extname(archivo.originalname).toLowerCase();
    const nombreFisico = `${tipo_documento}_${Date.now()}${ext}`;
    const rutaRelativa = `uploads/documentos/${id_afiliado}/${nombreFisico}`;
    const rutaAbsoluta = path.join(uploadDir, nombreFisico);

    // Escribir archivo en disco
    fs.writeFileSync(rutaAbsoluta, archivo.buffer);

    // Guardar registro en BD
    return await createDocumento({
        id_afiliado:    Number(id_afiliado),
        id_user:        Number(id_user),
        tipo_documento,
        nombre_archivo: archivo.originalname,
        ruta_archivo:   rutaRelativa,
        obligatorio:    Number(obligatorio),
    });
};

/**
 * Elimina un documento (registro BD + archivo físico)
 */
const remove = async (id) => {
    const doc = await getById(id);

    const rutaAbsoluta = path.join(__dirname, '..', '..', '..', doc.ruta_archivo);
    if (fs.existsSync(rutaAbsoluta)) fs.unlinkSync(rutaAbsoluta);

    return await deleteDocumento(id);
};

module.exports = { getAll, getByAfiliado, getByAgente, getById, upload, remove };