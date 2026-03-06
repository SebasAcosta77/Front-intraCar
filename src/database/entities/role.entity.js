
const { EntitySchema } = require('typeorm');

const RoleEntity = new EntitySchema({
    name: 'role',
    tableName: 'role',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true,
        },
        rol_name: {
            type: 'varchar',
            length: 50,
            nullable: false,
        },
        rol_description: {
            type: 'varchar',
            length: 100,
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
});

module.exports = { RoleEntity };