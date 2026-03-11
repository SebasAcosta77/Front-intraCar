

class AlterVehiculosAfiliado1741479600000 {
    name = 'AlterVehiculosAfiliado1741479600000';

    async up(queryRunner) {
        // La tabla ya tiene id_afiliado, solo agregar FK e índice
        await queryRunner.query(`
        ALTER TABLE vehiculos
            ADD CONSTRAINT fk_vehiculos_afiliado
            FOREIGN KEY (id_afiliado) REFERENCES afiliados(id)
            ON DELETE CASCADE ON UPDATE CASCADE
    `);
        await queryRunner.query(`ALTER TABLE vehiculos ADD INDEX idx_vehiculos_afiliado (id_afiliado)`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE vehiculos DROP FOREIGN KEY fk_vehiculos_afiliado`);
        await queryRunner.query(`ALTER TABLE vehiculos DROP INDEX idx_vehiculos_afiliado`);
        await queryRunner.query(`ALTER TABLE vehiculos DROP COLUMN id_afiliado`);
        await queryRunner.query(`ALTER TABLE vehiculos ADD COLUMN id_poliza INT NOT NULL AFTER id`);
        await queryRunner.query(`
            ALTER TABLE vehiculos
                ADD CONSTRAINT fk_vehiculos_poliza
                FOREIGN KEY (id_poliza) REFERENCES poliza(id)
                ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`ALTER TABLE vehiculos ADD INDEX idx_vehiculos_poliza (id_poliza)`);
    }
}

module.exports = { AlterVehiculosAfiliado1741479600000 };