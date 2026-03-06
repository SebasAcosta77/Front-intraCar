const { login, logout, register } = require('./auth.service.js');

const loginController = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                ok: false,
                message: 'Usuario y contraseña son requeridos',
            });
        }

        const result = await login(username, password);

        return res.status(200).json({
            ok: true,
            message: 'Login exitoso',
            data: result,
        });

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: error.message,
        });
    }
};


const logoutController = async (req, res) => {
    try {
        await logout(req.user.id);
        return res.status(200).json({
            ok: true,
            message: 'Sesión cerrada exitosamente',
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: error.message,
        });
    }
};

const registerController = async (req, res) => {
    try {
        const { NameU, JobTitle, UserA, PasswordU, Correo_e, RoleU, Ciudad } = req.body;

        if (!NameU || !JobTitle || !UserA || !PasswordU || !RoleU) {
            return res.status(400).json({
                ok: false,
                message: 'Faltan campos requeridos',
            });
        }

        const result = await register({ NameU, JobTitle, UserA, PasswordU, Correo_e, RoleU, Ciudad });

        return res.status(201).json({
            ok: true,
            message: 'Usuario registrado exitosamente',
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            ok: false,
            message: error.message,
        });
    }
};

module.exports = { loginController, logoutController, registerController };