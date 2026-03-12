const {
    login, logout, register,
    listarUsuarios, actualizarUsuario, eliminarUsuario, cambiarEstadoUsuario
} = require('./auth.service.js');

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ ok: false, message: 'Usuario y contraseña son requeridos' });
        }
        const result = await login(username, password);
        return res.status(200).json({ ok: true, message: 'Login exitoso', data: result });
    } catch (error) {
        return res.status(401).json({ ok: false, message: error.message });
    }
};

const logoutController = async (req, res) => {
    try {
        await logout(req.user.id);
        return res.status(200).json({ ok: true, message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const registerController = async (req, res) => {
    try {
        const { NameU, JobTitle, UserA, PasswordU, Correo_e, RoleU, Ciudad } = req.body;
        if (!NameU || !JobTitle || !UserA || !PasswordU || !RoleU) {
            return res.status(400).json({ ok: false, message: 'Faltan campos requeridos' });
        }
        const result = await register({ NameU, JobTitle, UserA, PasswordU, Correo_e, RoleU, Ciudad });
        return res.status(201).json({ ok: true, message: 'Usuario registrado exitosamente', data: result });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const listarUsuariosController = async (req, res) => {
    try {
        const usuarios = await listarUsuarios();
        return res.status(200).json({ ok: true, data: usuarios });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

const actualizarUsuarioController = async (req, res) => {
    try {
        const { id } = req.params;
        const usuario = await actualizarUsuario(Number(id), req.body);
        return res.status(200).json({ ok: true, message: 'Usuario actualizado', data: usuario });
    } catch (error) {
        return res.status(400).json({ ok: false, message: error.message });
    }
};

const eliminarUsuarioController = async (req, res) => {
    try {
        const { id } = req.params;
        await eliminarUsuario(Number(id));
        return res.status(200).json({ ok: true, message: 'Usuario eliminado' });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};
const cambiarEstadoUsuarioController = async (req, res) => {
    try {
        const { id } = req.params;
        const { estado } = req.body;
        if (estado === undefined || (estado !== 0 && estado !== 1))
            return res.status(400).json({ ok: false, message: 'Estado debe ser 0 o 1' });
        const usuario = await cambiarEstadoUsuario(Number(id), estado);
        return res.status(200).json({ ok: true, message: `Usuario ${estado === 1 ? 'activado' : 'desactivado'}`, data: usuario });
    } catch (error) {
        return res.status(500).json({ ok: false, message: error.message });
    }
};

module.exports = {
    loginController,
    logoutController,
    registerController,
    listarUsuariosController,
    actualizarUsuarioController,
    eliminarUsuarioController,
    cambiarEstadoUsuarioController
};