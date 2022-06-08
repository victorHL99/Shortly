import pg from 'pg';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_DATABASE;

const db = new Pool({
    user,
    password,
    host,
    port,
    database
});

    console.log(chalk.blue('Connected to database'));

    export default db;