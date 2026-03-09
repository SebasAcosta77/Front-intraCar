const { EntitySchema } = require('typeorm');

const DocumentoEntity = new EntitySchema({
    name: 'documentos',
    tableName: 'documentos',
    columns: {
        id: { primary: true, type: 'int', generated: true },
        id_afiliado: { type: 'int', nullable: false },
        id_user: { type: 'int', nullable: false },
        tipo_documento: { type: 'varchar', length: 60, nullable: false },
        nombre_archivo: { type: 'varchar', length: 255, nullable: false },
        ruta_archivo: { type: 'varchar', length: 255, nullable: false },
        obligatorio: { type: 'tinyint', nullable: false, default: 1 },
        fecha_carga: { type: 'datetime', createDate: true },
    },
    relations: {
        afiliado: {
            type: 'many-to-one',
            target: 'afiliados',
            joinColumn: { name: 'id_afiliado', referencedColumnName: 'id' },
            eager: false,
        },
        user: {
            type: 'many-to-one',
            target: 'users',
            joinColumn: { name: 'id_user', referencedColumnName: 'IdU' },
            eager: false,
        },
    },
});

module.exports = { DocumentoEntity };