// 005-create-cobertura.js

class CreateCobertura1708263000004 {
  name = 'CreateCobertura1708263000004';

  async up(queryRunner) {

    // 1. COBERTURA (1:1 con vehiculos)

    await queryRunner.query(`
      CREATE TABLE cobertura (
        id INT NOT NULL AUTO_INCREMENT,
        id_vehiculo INT NOT NULL UNIQUE,
        id_backoffice INT DEFAULT NULL,
        lesiones_corporales VARCHAR(20) DEFAULT NULL,
        sin_con_seguro VARCHAR(20) DEFAULT NULL,
        daños_propiedad VARCHAR(20) DEFAULT NULL,
        pagos_medicos VARCHAR(20) DEFAULT NULL,
        cobertura_estado VARCHAR(20) DEFAULT NULL,
        proteccion_lesiones_personales VARCHAR(20) DEFAULT NULL,
        perdida_salario VARCHAR(20) DEFAULT NULL,
        proteccion_lesiones_aplica VARCHAR(50) DEFAULT NULL,
        residencia VARCHAR(30) DEFAULT NULL,
        integral VARCHAR(20) DEFAULT NULL,
        colision VARCHAR(20) DEFAULT NULL,
        remolque_mano_obra VARCHAR(20) DEFAULT NULL,
        gastos_alquiler VARCHAR(20) DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_cobertura_vehiculo
          FOREIGN KEY (id_vehiculo) REFERENCES vehiculos(id)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_cobertura_backoffice
          FOREIGN KEY (id_backoffice) REFERENCES users(IdU)
          ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      ALTER TABLE cobertura
        ADD INDEX idx_cobertura_vehiculo (id_vehiculo),
        ADD INDEX idx_cobertura_backoffice (id_backoffice);
    `);


    // 2. DOCUMENTOS (cargue de documentos por afiliado)

    await queryRunner.query(`
      CREATE TABLE documentos (
        id             INT          NOT NULL AUTO_INCREMENT,
        id_afiliado    INT          NOT NULL,
        id_user        INT          NOT NULL,
        tipo_documento VARCHAR(60)  NOT NULL,
        nombre_archivo VARCHAR(255) NOT NULL,
        ruta_archivo   VARCHAR(255) NOT NULL,
        obligatorio    TINYINT(1)   NOT NULL DEFAULT 1,
        fecha_carga    DATETIME     DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_doc_afiliado
          FOREIGN KEY (id_afiliado) REFERENCES afiliados(id)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_doc_user
          FOREIGN KEY (id_user) REFERENCES users(IdU)
          ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    await queryRunner.query(`
      ALTER TABLE documentos
        ADD INDEX idx_doc_afiliado      (id_afiliado),
        ADD INDEX idx_doc_user          (id_user),
        ADD INDEX idx_doc_tipo          (tipo_documento),
        ADD INDEX idx_doc_afiliado_tipo (id_afiliado, tipo_documento);
    `);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE documentos DROP FOREIGN KEY fk_doc_user`);
    await queryRunner.query(`ALTER TABLE documentos DROP FOREIGN KEY fk_doc_afiliado`);
    await queryRunner.query(`ALTER TABLE cobertura DROP FOREIGN KEY fk_cobertura_backoffice`);
    await queryRunner.query(`ALTER TABLE cobertura DROP FOREIGN KEY fk_cobertura_vehiculo`);
    await queryRunner.query(`DROP TABLE IF EXISTS documentos`);
    await queryRunner.query(`DROP TABLE IF EXISTS cobertura`);
  }
}

module.exports = { CreateCobertura1708263000004 };