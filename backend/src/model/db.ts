import mysql from "mysql2";
import { databaseConfig } from "../Features/config";
const config = databaseConfig;

export const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER, 
    password: config.PASSWORD, 
    database: config.DATABASE,
    port: config.PORT
});


connection.connect((err) => {
    if(err) {
        throw new Error(`Erro ao conectar ao banco de dados >>> ${err.message}`);
    } else {
        console.log(`Conectado ao banco de dados com sucesso >>> ${config.HOST}:${config.PORT}`);
    }
}); 
  
