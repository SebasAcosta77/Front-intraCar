const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            return res.status(401).json({
                ok: false,
                message: 'Token no proporcionado'
            });
        }

        // Formato esperado: "Bearer <token>"
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'Formato de token inválido'
            });
        }

        // Verificar token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'Token inválido o expirado'
        });
    }
};

// Middleware para verificar rol
const roleMiddleware = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                ok: false,
                message: 'No tienes permisos para realizar esta acción'
            });
        }
        next();
    };
};

module.exports = { authMiddleware, roleMiddleware };