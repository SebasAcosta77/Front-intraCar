
const { DataSource } = require('typeorm');
const dotenv = require('dotenv');

dotenv.config();

const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT),
    username: process.env.DBUSER,
    password: process.env.DBPASS || '',
    database: process.env.DBNAME,
    synchronize: false,
    logging: false,
    entities: [
        __dirname + '/entities/*.js',
    ],
    migrations: [
        __dirname + '/migrations/*.js',   //
    ],
    migrationsTableName: 'migrations_history',
    timezone: 'Z',
});

module.exports = { AppDataSource };