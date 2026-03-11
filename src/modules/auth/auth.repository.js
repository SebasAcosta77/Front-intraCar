const { AppDataSource } = require('../../database/data-source.js');

const getRepository = () => AppDataSource.getRepository('users');
const getLogRepository = () => AppDataSource.getRepository('log');

const findUserByUsername = async (username) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { UserA: username },
        relations: ['role'],
    });
};

const findUserById = async (id) => {
    const repo = getRepository();
    return await repo.findOne({
        where: { IdU: id },
    });
};

const createUser = async (userData) => {
    const repo = getRepository();
    const user = repo.create(userData);
    return await repo.save(user);
};

// Crear registro de log al iniciar sesión
const createLog = async (data) => {
    const repo = getLogRepository();
    const log = repo.create(data);
    return await repo.save(log);
};

//  Actualizar hora_finish al cerrar sesión
const updateLogFinish = async (id_user) => {
    const repo = getLogRepository();
    const ahora = new Date();
    const hora_finish = ahora.toTimeString().split(' ')[0];

    const logActivo = await repo.findOne({
        where: { id_user, estado_conexion: 1 },
        order: { id_log: 'DESC' },
    });

    if (logActivo) {
        await repo.update(logActivo.id_log, {
            hora_finish,
            estado_conexion: 0,
        });
    }
};

module.exports = {
    findUserByUsername,
    findUserById,
    createUser,
    createLog,
    updateLogFinish,
};