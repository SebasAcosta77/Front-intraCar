// 004-create-vehiculos.js

class CreateVehiculos1708263000003 {
    name = 'CreateVehiculos1708263000003';

    async up(queryRunner) {
       
        // 1. VEHICULOS
        
        await queryRunner.query(`
      CREATE TABLE vehiculos (
        id INT NOT NULL AUTO_INCREMENT,
        id_poliza INT NOT NULL,
        identificacion_vehiculo VARCHAR(17) DEFAULT NULL,
        uso_vehiculo VARCHAR(20) DEFAULT NULL,
        millas_ida DECIMAL(10,2) DEFAULT NULL,
        dias_semana TINYINT DEFAULT NULL,
        semanas_mes TINYINT DEFAULT NULL,
        tipo_propiedad VARCHAR(20) DEFAULT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        CONSTRAINT fk_vehiculos_poliza
          FOREIGN KEY (id_poliza) REFERENCES poliza(id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        await queryRunner.query(`
      ALTER TABLE vehiculos
        ADD INDEX idx_vehiculos_poliza (id_poliza),
        ADD INDEX idx_vehiculos_vin (identificacion_vehiculo);
    `);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE vehiculos DROP FOREIGN KEY fk_vehiculos_poliza`);
        await queryRunner.query(`DROP TABLE IF EXISTS vehiculos`);
    }
}

module.exports = { CreateVehiculos1708263000003 };