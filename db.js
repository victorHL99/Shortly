import pg from 'pg';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const databaseConfig = {
    connectionString: process.env.DATABASE_URL,  
}

if(process.env.MODE === "PROD"){
    databaseConfig.ssl = {
        rejectUnauthorized: false
    }
}

const db = new Pool(databaseConfig);

    export default db;

