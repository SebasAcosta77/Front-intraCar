const { EntitySchema } = require('typeorm');

const AfiliadosEntity = new EntitySchema({
    name: 'afiliados',
    tableName: 'afiliados',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        id_agente: {
            type: 'int',
            nullable: false,
        },
        es_titular: {
            type: 'tinyint',
            default: 1,
            nullable: false,
        },
        cantidad_conductores: {
            type: 'int',
            nullable: true,
        },
        nombres: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        apellidos: {
            type: 'varchar',
            length: 100,
            nullable: false,
        },
        direccion_estado: {
            type: 'varchar',
            length: 40,
            nullable: true,
        },
        codigo_postal: {
            type: 'varchar',
            length: 10,
            nullable: true,
        },
        genero: {
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
        estado: {
            type: 'varchar',
            length: 30,
            default: 'interesado',
            nullable: false,
        },
    },
    relations: {
        agente: {
            type: 'many-to-one',
            target: 'users',
            joinColumn: {
                name: 'id_agente',
                referencedColumnName: 'IdU',
            },
            eager: false,
        },
        detalles: {
            type: 'one-to-one',
            target: 'detalles',
            inverseSide: 'afiliado',
            eager: false,
        },
        vehiculos: {
            type: 'one-to-many',
            target: 'vehiculos',
            inverseSide: 'afiliado',
            eager: false,
        },
    },
});

module.exports = { AfiliadosEntity };