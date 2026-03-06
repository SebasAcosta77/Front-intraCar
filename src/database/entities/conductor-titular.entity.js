const { EntitySchema } = require('typeorm');

const ConductorTitularEntity = new EntitySchema({
    name: 'conductor_titular',
    tableName: 'conductor_titular',
    columns: {
        id: { primary: true, type: 'int', generated: true },
        id_titular: { type: 'int', nullable: false },
        id_conductor: { type: 'int', nullable: false },
        created_at: { type: 'datetime', default: () => 'CURRENT_TIMESTAMP' },
    },
    relations: {
        titular: {
            type: 'many-to-one',
            target: 'afiliados',
            joinColumn: { name: 'id_titular', referencedColumnName: 'id' },
            eager: false,
        },
        conductor: {
            type: 'many-to-one',
            target: 'afiliados',
            joinColumn: { name: 'id_conductor', referencedColumnName: 'id' },
            eager: false,
        },
    },
});

module.exports = { ConductorTitularEntity };