const { EntitySchema } = require('typeorm');

const PolizaConductoresEntity = new EntitySchema({
    name: 'poliza_conductores',
    tableName: 'poliza_conductores',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        id_poliza: {
            type: 'int',
            nullable: false,
        },
        id_afiliado: {
            type: 'int',
            nullable: false,
        },
        created_at: {
            type: 'datetime',
            createDate: true,
        },
    },
    relations: {
        poliza: {
            type: 'many-to-one',
            target: 'poliza',
            joinColumn: {
                name: 'id_poliza',
                referencedColumnName: 'id',
            },
            eager: false,
        },
        afiliado: {
            type: 'many-to-one',
            target: 'afiliados',
            joinColumn: {
                name: 'id_afiliado',
                referencedColumnName: 'id',
            },
            eager: false,
        },
    },
});

module.exports = { PolizaConductoresEntity };