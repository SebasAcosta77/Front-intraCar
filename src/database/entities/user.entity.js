const { EntitySchema } = require('typeorm');

const UserEntity = new EntitySchema({
    name: 'users',
    tableName: 'users',
    columns: {
        IdU: {
            primary: true,
            type: 'int',
            generated: true,
        },
        NameU: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        JobTitle: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        UserA: {
            type: 'varchar',
            length: 20,
            nullable: false,
            unique: true,
        },
        PasswordU: {
            type: 'varchar',
            length: 255,
            nullable: false,
        },
        Correo_e: {
            type: 'varchar',
            length: 100,
            nullable: true,
        },
        RoleU: {
            type: 'int',
            nullable: false,
        },
        estado: {
            type: 'tinyint',
            default: 1,
            nullable: false,
        },
        Ciudad: {
            type: 'varchar',
            length: 50,
            default: 'Bogota',
            nullable: false,
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
        role: {                         
            type: 'many-to-one',
            target: 'role',
            joinColumn: {
                name: 'RoleU',               // columna FK en users
                referencedColumnName: 'id',  // columna PK en role
            },
            eager: false,
        },
    },
});

module.exports = { UserEntity };