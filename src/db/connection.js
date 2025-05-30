import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectionParams = {
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    dialect: process.env.DB_DIALECT,
    port: Number(process.env.DB_PORT)
}

export const sequlize = new Sequelize(connectionParams.database,connectionParams.username,connectionParams.password,{
    host: connectionParams.host,
    dialect: connectionParams.dialect,
    port: connectionParams.port
})

export const connectDB = async() => {
    try {
        await sequlize.authenticate();
        await sequlize.sync();
        console.log(" DATABASE connected successfully")
    } catch (error){
        console.error(`Error in connection:: `,error)
    }
}