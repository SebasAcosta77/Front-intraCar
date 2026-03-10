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

const UPLOAD_BASE = path.join(__dirname, '..', '..', '..', 'uploads', 'documentos');

const getUploadDir = (id_afiliado) => {
    const dir = path.join(UPLOAD_BASE, String(id_afiliado));
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    return dir;
};

const getAll       = async () => findAll();
const getByAfiliado = async (id_afiliado) => findByAfiliado(id_afiliado);
const getByAgente   = async (id_agente) => findByAgente(id_agente);

const getById = async (id) => {
    const doc = await findById(id);
    if (!doc) throw new Error(`Documento ${id} no encontrado`);
    return doc;
};

/**
 * Sube un archivo físico y guarda registro en BD
 */
const upload = async (id_afiliado, id_user, tipo_documento, archivo, obligatorio = 1) => {
    if (!archivo) throw new Error('No se recibió ningún archivo');

    const uploadDir = getUploadDir(id_afiliado);

    const existing = await findByAfiliadoYTipo(id_afiliado, tipo_documento);
    if (existing) {
        if (existing.ruta_archivo) {
            const rutaAnterior = path.join(__dirname, '..', '..', '..', existing.ruta_archivo);
            if (fs.existsSync(rutaAnterior)) fs.unlinkSync(rutaAnterior);
        }
        await deleteDocumento(existing.id);
    }

    const ext          = path.extname(archivo.originalname).toLowerCase();
    const nombreFisico = `${tipo_documento}_${Date.now()}${ext}`;
    const rutaRelativa = `uploads/documentos/${id_afiliado}/${nombreFisico}`;
    const rutaAbsoluta = path.join(uploadDir, nombreFisico);

    fs.writeFileSync(rutaAbsoluta, archivo.buffer);

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
 * Guarda un texto (número de cuenta) sin archivo físico.
 * nombre_archivo = el texto ingresado
 * ruta_archivo   = null
 */
const uploadTexto = async (id_afiliado, id_user, tipo_documento, texto, obligatorio = 0) => {
    if (!texto || !texto.trim()) throw new Error('El texto no puede estar vacío');

    const existing = await findByAfiliadoYTipo(id_afiliado, tipo_documento);
    if (existing) await deleteDocumento(existing.id);

    return await createDocumento({
        id_afiliado:    Number(id_afiliado),
        id_user:        Number(id_user),
        tipo_documento,
        nombre_archivo: texto.trim(),
        ruta_archivo:   null,
        obligatorio:    Number(obligatorio),
    });
};

/**
 * Elimina un documento — borra archivo físico si existe, luego el registro.
 */
const remove = async (id) => {
    const doc = await getById(id);

    if (doc.ruta_archivo) {
        const rutaAbsoluta = path.join(__dirname, '..', '..', '..', doc.ruta_archivo);
        if (fs.existsSync(rutaAbsoluta)) fs.unlinkSync(rutaAbsoluta);
    }

    return await deleteDocumento(id);
};

module.exports = { getAll, getByAfiliado, getByAgente, getById, upload, uploadTexto, remove };