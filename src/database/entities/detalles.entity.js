const { EntitySchema } = require('typeorm');

const DetallesEntity = new EntitySchema({
    name: 'detalles',
    tableName: 'detalles',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        id_afiliado: {
            type: 'int',
            nullable: false,
            unique: true,
        },
        fecha_nacimiento: {
            type: 'date',
            nullable: true,
        },
        estado_civil: {
            type: 'varchar',
            length: 100,
            nullable: true,
        },
        industria: {
            type: 'varchar',
            length: 100,
            nullable: true,
        },
        ocupacion: {
            type: 'varchar',
            length: 255,
            nullable: true,
        },
        direccion_estacionamiento: {
            type: 'varchar',
            length: 255,
            nullable: true,
        },
        años_direccion: {
            type: 'smallint',
            nullable: true,
        },
        telefono: {
            type: 'varchar',
            length: 30,
            nullable: true,
        },
        correo: {
            type: 'varchar',
            length: 100,
            nullable: true,
        },
        numero_licencia: {
            type: 'varchar',
            length: 50,
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
            type: 'one-to-one',
            target: 'afiliados',
            joinColumn: {
                name: 'id_afiliado',
                referencedColumnName: 'id',
            },
            eager: false,
        },
    },
});

module.exports = { DetallesEntity };