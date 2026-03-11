// 003-create-poliza.js

class CreatePoliza1708263000002 {
    name = 'CreatePoliza1708263000002';

    async up(queryRunner) {
       
        // 1. POLIZA
        
        await queryRunner.query(`
      CREATE TABLE poliza (
        id INT NOT NULL AUTO_INCREMENT,
        id_afiliado INT NOT NULL,
        id_backoffice INT DEFAULT NULL,
        estado_poliza VARCHAR(20) NOT NULL DEFAULT 'pendiente_pago',
        poliza_anterior VARCHAR(100) DEFAULT NULL,
        tiempo_poliza_anterior VARCHAR(100) DEFAULT NULL,
        fecha_vencimiento_poliza_anterior DATE DEFAULT NULL,
        plazo_poliza_anterior VARCHAR(20) DEFAULT NULL,
        plazo_poliza_nueva VARCHAR(20) DEFAULT NULL,
        fecha_inicio_nueva DATE DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_poliza_afiliado
          FOREIGN KEY (id_afiliado) REFERENCES afiliados(id)
          ON DELETE RESTRICT ON UPDATE CASCADE,
        CONSTRAINT fk_poliza_backoffice
          FOREIGN KEY (id_backoffice) REFERENCES users(IdU)
          ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        await queryRunner.query(`
      ALTER TABLE poliza
        ADD INDEX idx_poliza_afiliado (id_afiliado),
        ADD INDEX idx_poliza_estado (estado_poliza),
        ADD INDEX idx_poliza_backoffice (id_backoffice);
    `);

       
        // 2. POLIZA_CONDUCTORES (N:M poliza ↔ conductores)
      
        await queryRunner.query(`
      CREATE TABLE poliza_conductores (
        id INT NOT NULL AUTO_INCREMENT,
        id_poliza INT NOT NULL,
        id_afiliado INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_pc_poliza
          FOREIGN KEY (id_poliza) REFERENCES poliza(id)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_pc_afiliado
          FOREIGN KEY (id_afiliado) REFERENCES afiliados(id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        await queryRunner.query(`
      ALTER TABLE poliza_conductores
        ADD INDEX idx_pc_poliza (id_poliza),
        ADD INDEX idx_pc_afiliado (id_afiliado);
    `);
    }

    // DOWN: orden inverso respetando FKs
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE poliza_conductores DROP FOREIGN KEY fk_pc_afiliado`);
        await queryRunner.query(`ALTER TABLE poliza_conductores DROP FOREIGN KEY fk_pc_poliza`);
        await queryRunner.query(`ALTER TABLE poliza DROP FOREIGN KEY fk_poliza_backoffice`);
        await queryRunner.query(`ALTER TABLE poliza DROP FOREIGN KEY fk_poliza_afiliado`);
        await queryRunner.query(`DROP TABLE IF EXISTS poliza_conductores`);
        await queryRunner.query(`DROP TABLE IF EXISTS poliza`);
    }
}

module.exports = { CreatePoliza1708263000002 };