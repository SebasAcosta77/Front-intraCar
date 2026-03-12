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

const findAllUsers = async () => {
    const repo = getRepository();
    return await repo.find({
        select: ['IdU', 'NameU', 'JobTitle', 'UserA', 'Correo_e', 'RoleU', 'Ciudad', 'estado'],
        order: { IdU: 'DESC' },
    });
};

const createUser = async (userData) => {
    const repo = getRepository();
    const user = repo.create(userData);
    return await repo.save(user);
};

const updateUser = async (id, userData) => {
    const repo = getRepository();
    await repo.update({ IdU: id }, userData);
    return await repo.findOne({ where: { IdU: id } });
};

const deleteUser = async (id) => {
    const repo = getRepository();
    return await repo.delete({ IdU: id });
};

// Crear registro de log al iniciar sesión
const createLog = async (data) => {
    const repo = getLogRepository();
    const log = repo.create(data);
    return await repo.save(log);
};

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
    findAllUsers,
    createUser,
    updateUser,
    deleteUser,
    createLog,
    updateLogFinish,
};