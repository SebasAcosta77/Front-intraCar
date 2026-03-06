import * as dotenv from 'dotenv';

export function loadEnvConfig() {
    dotenv.config();

    const requiredVars = [
        'DB_HOST',
        'DB_PORT',
        'DB_USER',
        'DB_PASSWORD',
        'DB_NAME',
        'JWT_SECRET',
        'JWT_EXPIRES_IN',
    ];

    const missingVars = requiredVars.filter(
        (key) => !process.env[key],
    );

    if (missingVars.length > 0) {
        throw new Error(
            ` Faltan variables de entorno requeridas: ${missingVars.join(', ')}`,
        );
    }
}
