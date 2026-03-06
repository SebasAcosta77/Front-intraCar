const express = require('express');
const dotenv = require('dotenv');
const { AppDataSource } = require('./database/data-source.js');
const authRoutes = require('./modules/auth/auth.routes.js');
const afiliadosRoutes = require('./modules/afiliados/afiliados.routes.js');
const polizaRoutes = require('./modules/poliza/poliza.routes.js');
const vehiculosRoutes = require('./modules/vehiculos/vehiculos.routes.js');
const coberturaRoutes = require('./modules/cobertura/cobertura.routes.js');
const detallesRoutes = require('./modules/detalles/detalles.routes.js');


dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const cors = require('cors');

app.use(cors({
    origin: [
        'http://localhost:5173',  
        'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/afiliados', afiliadosRoutes);
app.use('/api/v1/polizas', polizaRoutes);
app.use('/api/v1/vehiculos', vehiculosRoutes);
app.use('/api/v1/coberturas', coberturaRoutes);
app.use('/api/v1/detalles', detallesRoutes);


app.get('/', (req, res) => {
    res.json({ message: ' IntraCar API corriendo', status: 'ok' });
});

AppDataSource.initialize()
    .then(() => {
        console.log(' Base de datos conectada');
        app.listen(port, () => {
            console.log(` Servidor corriendo en: http://localhost:${port}/api/v1`);
        });
    })
    .catch((error) => {
        console.error(' Error conectando la base de datos:', error.message);
        process.exit(1);
    });