// 002-create-afiliados-detalles.js

class CreateAfiliadosDetalles1708263000001 {
  name = 'CreateAfiliadosDetalles1708263000001';

  async up(queryRunner) {

    // 1. AFILIADOS
   
    await queryRunner.query(`
      CREATE TABLE afiliados (
        id INT NOT NULL AUTO_INCREMENT,
        id_agente INT NOT NULL,
        es_titular TINYINT(1) NOT NULL DEFAULT 1,
        cantidad_conductores INT DEFAULT NULL,
        nombres VARCHAR(100) NOT NULL,
        apellidos VARCHAR(100) NOT NULL,
        direccion_estado VARCHAR(40) DEFAULT NULL,
        codigo_postal VARCHAR(10) DEFAULT NULL,
        genero VARCHAR(20) DEFAULT NULL,
        nota_estado TEXT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_afiliados_users
          FOREIGN KEY (id_agente) REFERENCES users(IdU)
          ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      ALTER TABLE afiliados
        ADD INDEX idx_afiliados_agente (id_agente),
        ADD INDEX idx_afiliados_nombres (nombres, apellidos),
        ADD INDEX idx_afiliados_titular (es_titular);
    `);

    
    // 2. DETALLES (1:1 con afiliados)
   
    await queryRunner.query(`
      CREATE TABLE detalles (
        id INT NOT NULL AUTO_INCREMENT,
        id_afiliado INT NOT NULL UNIQUE,
        fecha_nacimiento DATE DEFAULT NULL,
        estado_civil VARCHAR(100) DEFAULT NULL,
        industria VARCHAR(100) DEFAULT NULL,
        ocupacion VARCHAR(255) DEFAULT NULL,
        direccion_estacionamiento VARCHAR(255) DEFAULT NULL,
        años_direccion SMALLINT DEFAULT NULL,
        telefono VARCHAR(30) DEFAULT NULL,
        correo VARCHAR(100) DEFAULT NULL,
        numero_licencia VARCHAR(50) DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_detalles_afiliados
          FOREIGN KEY (id_afiliado) REFERENCES afiliados(id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
  }

  // DOWN: orden inverso respetando FKs
  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE detalles DROP FOREIGN KEY fk_detalles_afiliados`);
    await queryRunner.query(`ALTER TABLE afiliados DROP FOREIGN KEY fk_afiliados_users`);
    await queryRunner.query(`DROP TABLE IF EXISTS detalles`);
    await queryRunner.query(`DROP TABLE IF EXISTS afiliados`);
  }
}

module.exports = { CreateAfiliadosDetalles1708263000001 };