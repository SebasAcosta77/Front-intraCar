class AddEstadoAfiliados1708263000005 {
    name = 'AddEstadoAfiliados1708263000005';

    async up(queryRunner) {
        // ✅ DEFAULT 'interesado' — los registros existentes quedan con ese valor
        await queryRunner.query(`
      ALTER TABLE afiliados
        ADD COLUMN estado VARCHAR(30) NOT NULL DEFAULT 'interesado'
        AFTER genero;
    `);

        await queryRunner.query(`
      ALTER TABLE afiliados
        ADD INDEX idx_afiliados_estado (estado);
    `);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE afiliados DROP INDEX idx_afiliados_estado`);
        await queryRunner.query(`ALTER TABLE afiliados DROP COLUMN estado`);
    }
}

module.exports = { AddEstadoAfiliados1708263000005 };