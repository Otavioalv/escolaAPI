import { connection } from "../model/db";

class ListCustomersService {
    async execute() {
      try{  
        
        const [rows, fields] = await connection.promise().query(`SELECT * FROM aluno`);

        return { rows, fields }


      } catch(err) {
        
        console.error("Erro na consulta >>> ", err);
        throw new Error(`Erro ao listar alunos >>> ${err}`);

      } 
    }
}

export {ListCustomersService};