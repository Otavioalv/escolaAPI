import mysql from "mysql2";

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "123456", 
    database: "test"
});


connection.connect((err) => {
    if(err) {
        throw new Error(`Erro ao conectar ao banco de dados >>> ${err.message}`);
    } else {
        console.log("Conectado ao banco de dados com sucesso >>> ");
    }
}); 
  
