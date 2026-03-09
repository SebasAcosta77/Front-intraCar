const { EntitySchema } = require('typeorm');

const VehiculosEntity = new EntitySchema({
    name: 'vehiculos',
    tableName: 'vehiculos',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        id_afiliado: {          // ← DENTRO de columns
            type: 'int',
            nullable: false,
        },
        identificacion_vehiculo: {
            type: 'varchar',
            length: 17,
            nullable: true,
        },
        uso_vehiculo: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        millas_ida: {
            type: 'decimal',
            precision: 10,
            scale: 2,
            nullable: true,
        },
        dias_semana: {
            type: 'tinyint',
            nullable: true,
        },
        semanas_mes: {
            type: 'tinyint',
            nullable: true,
        },
        tipo_propiedad: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        created_at: {
            type: 'datetime',
            createDate: true,
        },
        updated_at: {
            type: 'datetime',
            updateDate: true,
        },
    },
    relations: {
        afiliado: {
            type: 'many-to-one',
            target: 'afiliados',
            joinColumn: {
                name: 'id_afiliado',
                referencedColumnName: 'id',
            },
            eager: false,
        },
        cobertura: {
            type: 'one-to-one',
            target: 'cobertura',
            inverseSide: 'vehiculo',
            eager: false,
        },
    }
});

module.exports = { VehiculosEntity };