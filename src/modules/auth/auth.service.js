// src/modules/auth/auth.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, createUser, createLog, updateLogFinish } = require('./auth.repository.js');

const SALT_ROUNDS = 10;

const login = async (username, password) => {
    // 1. Verificar si el usuario existe
    const user = await findUserByUsername(username);
    if (!user) throw new Error('Credenciales inválidas');

    // 2. Verificar si está activo
    if (!user.estado) throw new Error('Usuario inactivo');

    // 3. Verificar contraseña
    const passwordValid = await bcrypt.compare(password, user.PasswordU);
    if (!passwordValid) throw new Error('Credenciales inválidas');

    // 4. Generar JWT
    const token = jwt.sign(
        {
            id: user.IdU,
            username: user.UserA,
            role: user.RoleU,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    // 5. ✅ Registrar log de conexión
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
    // 1. Verificar si el usuario ya existe
    const existingUser = await findUserByUsername(userData.UserA);
    if (existingUser) throw new Error('El nombre de usuario ya está en uso');

    // 2. Hashear contraseña
    const hashedPassword = await bcrypt.hash(userData.PasswordU, SALT_ROUNDS);

    // 3. Crear usuario
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

module.exports = { login, logout, register };