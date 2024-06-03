import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const pool = mysql.createPool({
    connectionLimit: 10,
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName
});

export default pool;