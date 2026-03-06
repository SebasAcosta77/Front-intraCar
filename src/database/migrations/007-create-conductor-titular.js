class CreateConductorTitular1708263000006 {
    name = 'CreateConductorTitular1708263000006';

    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE conductor_titular (
        id INT NOT NULL AUTO_INCREMENT,
        id_titular INT NOT NULL,
        id_conductor INT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_titular_conductor (id_titular, id_conductor),
        CONSTRAINT fk_ct_titular
          FOREIGN KEY (id_titular) REFERENCES afiliados(id)
          ON DELETE CASCADE ON UPDATE CASCADE,
        CONSTRAINT fk_ct_conductor
          FOREIGN KEY (id_conductor) REFERENCES afiliados(id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        await queryRunner.query(`
      ALTER TABLE conductor_titular
        ADD INDEX idx_ct_titular (id_titular),
        ADD INDEX idx_ct_conductor (id_conductor);
    `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE IF EXISTS conductor_titular`);
    }
}

module.exports = { CreateConductorTitular1708263000006 };