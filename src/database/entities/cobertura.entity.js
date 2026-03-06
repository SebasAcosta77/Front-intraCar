const { EntitySchema } = require('typeorm');

const CoberturaEntity = new EntitySchema({
    name: 'cobertura',
    tableName: 'cobertura',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        id_vehiculo: {
            type: 'int',
            nullable: false,
            unique: true,
        },
        id_backoffice: {
            type: 'int',
            nullable: true,
        },
        lesiones_corporales: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        sin_con_seguro: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        daños_propiedad: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        pagos_medicos: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        cobertura_estado: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        proteccion_lesiones_personales: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        perdida_salario: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        proteccion_lesiones_aplica: {
            type: 'varchar',
            length: 50,
            nullable: true,
        },
        residencia: {
            type: 'varchar',
            length: 30,
            nullable: true,
        },
        integral: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        colision: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        remolque_mano_obra: {
            type: 'varchar',
            length: 20,
            nullable: true,
        },
        gastos_alquiler: {
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
        vehiculo: {
            type: 'one-to-one',
            target: 'vehiculos',
            joinColumn: {
                name: 'id_vehiculo',
                referencedColumnName: 'id',
            },
            eager: false,
        },
        backoffice: {
            type: 'many-to-one',
            target: 'users',
            joinColumn: {
                name: 'id_backoffice',
                referencedColumnName: 'IdU',
            },
            eager: false,
        },
    },
});

module.exports = { CoberturaEntity };