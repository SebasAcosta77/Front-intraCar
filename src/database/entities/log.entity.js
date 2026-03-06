const { EntitySchema } = require('typeorm');

const LogEntity = new EntitySchema({
  name: 'log',
  tableName: 'log',
  columns: {
    id_log: {
      primary: true,
      type: 'int',
      generated: true,
    },
    id_user: {
      type: 'int',
      nullable: false,
    },
    nombre_user: {
      type: 'varchar',
      length: 80,
      nullable: false,
    },
    ciudad: {
      type: 'varchar',
      length: 20,
      nullable: false,
    },
    cliente: {
      type: 'varchar',
      length: 30,
      nullable: true,
    },
    campana: {
      type: 'varchar',
      length: 30,
      nullable: true,
    },
    fecha: {
      type: 'date',
      nullable: false,
    },
    hora_start: {
      type: 'time',
      nullable: false,
    },
    hora_finish: {
      type: 'time',
      nullable: true,
    },
    estado_novedad: {
      type: 'varchar',
      length: 30,
      nullable: true,
    },
    estado_conexion: {
      type: 'tinyint',
      default: 0,
      nullable: false,
    },
  },
  relations: {
    user: {
      type: 'many-to-one',
      target: 'users',
      joinColumn: {
        name: 'id_user',
        referencedColumnName: 'IdU',
      },
      eager: false,
    },
  },
});

module.exports = { LogEntity };