// 001-create-role-users-login.js

class CreateRoleUsersLog1708263000000 {
    name = 'CreateRoleUsersLog1708263000000';

    async up(queryRunner) {

        // 1. ROLE

        await queryRunner.query(`
      CREATE TABLE role (
        id INT NOT NULL AUTO_INCREMENT,
        rol_name VARCHAR(50) NOT NULL,
        rol_description VARCHAR(100),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        // Roles iniciales del sistema
        await queryRunner.query(`
      INSERT INTO role (rol_name, rol_description) VALUES
        ('Agente', 'Agente de ventas que registra afiliados y comunica cotizaciones'),
        ('BackOffice', 'Encargado de cotizar seguros y registrar coberturas'),
        ('SuperUsuario', 'Tiene acceso a todo, incluyendo crear usuarios');
    `);


        // 2. USERS

        await queryRunner.query(`
      CREATE TABLE users (
        IdU INT NOT NULL AUTO_INCREMENT,
        NameU VARCHAR(50) NOT NULL,
        JobTitle VARCHAR(50) NOT NULL,
        UserA VARCHAR(20) NOT NULL UNIQUE,
        PasswordU VARCHAR(255) NOT NULL,
        Correo_e VARCHAR(100),
        RoleU INT NOT NULL,
        estado TINYINT NOT NULL DEFAULT 1,
        Ciudad VARCHAR(50) NOT NULL DEFAULT 'Bogota',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (IdU),
        CONSTRAINT fk_users_role
          FOREIGN KEY (RoleU) REFERENCES role(id)
          ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        await queryRunner.query(`
      ALTER TABLE users
        ADD INDEX idx_users_role (RoleU),
        ADD INDEX idx_users_estado (estado);
    `);


        // 3. LOG

        await queryRunner.query(`
      CREATE TABLE log (
        id_log INT NOT NULL AUTO_INCREMENT,
        id_user INT NOT NULL,
        nombre_user VARCHAR(80) NOT NULL,
        ciudad VARCHAR(20) NOT NULL,
        cliente VARCHAR(30) NOT NULL,
        campana VARCHAR(30) NOT NULL,
        fecha DATE NOT NULL,
        hora_start TIME NOT NULL,
        hora_finish TIME NOT NULL,
        estado_novedad VARCHAR(30),
        estado_conexion TINYINT NOT NULL DEFAULT 0,
        PRIMARY KEY (id_log),
        CONSTRAINT fk_log_users
          FOREIGN KEY (id_user) REFERENCES users(IdU)
          ON DELETE RESTRICT ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

        await queryRunner.query(`
      ALTER TABLE log
        ADD INDEX idx_log_fecha (fecha),
        ADD INDEX idx_log_user (id_user),
        ADD INDEX idx_log_conexion (estado_conexion);
    `); 
    }

    // DOWN: orden inverso respetando FKs
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE log DROP FOREIGN KEY fk_log_users`);
        await queryRunner.query(`ALTER TABLE users DROP FOREIGN KEY fk_users_role`);
        await queryRunner.query(`DROP TABLE IF EXISTS log`);
        await queryRunner.query(`DROP TABLE IF EXISTS users`);
        await queryRunner.query(`DROP TABLE IF EXISTS role`);
    }
}

module.exports = { CreateRoleUsersLog1708263000000 };