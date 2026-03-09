const { EntitySchema } = require('typeorm');

const PolizaEntity = new EntitySchema({
    name: 'poliza',
    tableName: 'poliza',
    columns: {
        id: { primary: true, type: 'int', generated: true },
        id_afiliado: { type: 'int', nullable: false },
        id_backoffice: { type: 'int', nullable: true },
        estado_poliza: { type: 'varchar', length: 20, default: 'cotizando', nullable: false },
        poliza_anterior: { type: 'varchar', length: 100, nullable: true },
        tiempo_poliza_anterior: { type: 'varchar', length: 100, nullable: true },
        fecha_vencimiento_poliza_anterior: { type: 'date', nullable: true },
        plazo_poliza_anterior: { type: 'varchar', length: 20, nullable: true },
        plazo_poliza_nueva: { type: 'varchar', length: 20, nullable: true },
        fecha_inicio_nueva: { type: 'date', nullable: true },
        created_at: { type: 'datetime', createDate: true },
        updated_at: { type: 'datetime', updateDate: true },
    },
    relations: {
        afiliado: {
            type: 'many-to-one',
            target: 'afiliados',
            joinColumn: { name: 'id_afiliado', referencedColumnName: 'id' },
            eager: false,
        },
        backoffice: {
            type: 'many-to-one',
            target: 'users',
            joinColumn: { name: 'id_backoffice', referencedColumnName: 'IdU' },
            eager: false,
        },
        conductores: {
            type: 'one-to-many',
            target: 'poliza_conductores',
            inverseSide: 'poliza',
            eager: false,
        },
        // ← vehiculos ELIMINADO (ya no dependen de poliza)
    },
});

module.exports = { PolizaEntity };