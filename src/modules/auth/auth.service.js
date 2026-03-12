const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
    findUserByUsername, findAllUsers,
    createUser, updateUser, deleteUser,
    createLog, updateLogFinish,
} = require('./auth.repository.js');

const SALT_ROUNDS = 10;

const login = async (username, password) => {
    const user = await findUserByUsername(username);
    if (!user) throw new Error('Credenciales inválidas');
    if (!user.estado) throw new Error('Usuario inactivo');

    const passwordValid = await bcrypt.compare(password, user.PasswordU);
    if (!passwordValid) throw new Error('Credenciales inválidas');

    const token = jwt.sign(
        { id: user.IdU, username: user.UserA, role: user.RoleU },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    const ahora = new Date();
    const fecha = ahora.toISOString().split('T')[0];
    const hora_start = ahora.toTimeString().split(' ')[0];

    await createLog({
        id_user: user.IdU,
        nombre_user: user.NameU,
        ciudad: user.Ciudad,
        cliente: '',
        campana: '',
        fecha,
        hora_start,
        hora_finish: hora_start,
        estado_novedad: 'Conectado',
        estado_conexion: 1,
    });

    return {
        token,
        user: {
            id: user.IdU,
            nombre: user.NameU,
            username: user.UserA,
            correo: user.Correo_e,
            role: user.RoleU,
            ciudad: user.Ciudad,
        },
    };
};

const logout = async (id_user) => {
    await updateLogFinish(id_user);
};

const register = async (userData) => {
    const existingUser = await findUserByUsername(userData.UserA);
    if (existingUser) throw new Error('El nombre de usuario ya está en uso');

    const hashedPassword = await bcrypt.hash(userData.PasswordU, SALT_ROUNDS);

    const newUser = await createUser({
        ...userData,
        PasswordU: hashedPassword,
        estado: 1,
    });

    return {
        id: newUser.IdU,
        nombre: newUser.NameU,
        username: newUser.UserA,
        correo: newUser.Correo_e,
        role: newUser.RoleU,
        ciudad: newUser.Ciudad,
    };
};

const listarUsuarios = async () => {
    return await findAllUsers();
};

const actualizarUsuario = async (id, userData) => {
    // Si viene nueva contraseña, hashearla
    if (userData.PasswordU) {
        userData.PasswordU = await bcrypt.hash(userData.PasswordU, SALT_ROUNDS);
    }
    // No permitir cambiar username
    delete userData.UserA;

    return await updateUser(id, userData);
};

const eliminarUsuario = async (id) => {
    return await deleteUser(id);
};

const cambiarEstadoUsuario = async (id, estado) => {
    return await updateUser(id, { estado });
};

module.exports = { login, logout, register, listarUsuarios, actualizarUsuario, eliminarUsuario, cambiarEstadoUsuario  };