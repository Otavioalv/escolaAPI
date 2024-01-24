import { connection } from "../../../model/db";

import { datasValidationAluno } from "../../helper/datasValidationAluno";

import { AlunoProps } from "../../props/AlunoProps";
import { ResponseProps } from "../../props/ResponseProps";

import { CreateMatriculaController } from "../../controllers/Matricula/CreateMatricula.Controller";
import { StatusCodes } from "../../helper/statusResult";

import { hashSync } from "bcrypt";


class CreateAlunoService extends CreateMatriculaController{
    async execute({nome, data_nascimento, cpf, telefone, id_curso}: AlunoProps ){        
        try{
            const newDate:string = data_nascimento?.toString().substring(0, 10) ?? "";
            const validation:boolean = await datasValidationAluno({nome, data_nascimento: newDate, cpf, telefone, id_curso});
            if(!validation) return StatusCodes.BadRequest;
        
            const password:string = await this.generatePassword({nome, cpf});
            
            await connection.promise().beginTransaction();

            const response:ResponseProps = await connection.promise().query(
                `INSERT INTO aluno (nome, data_nascimento, cpf, telefone, senha) 
                VALUE (?, ?, ?, ?, ?)`,
                [nome, newDate, cpf, telefone, password]
            )
            .then(async () => {
                
                const newMatricula = await this.matricula({id_curso, cpf}); 
                
                if(!newMatricula) {
                    await connection.promise().rollback();
                    return StatusCodes.BadRequest;
                }
                
                await connection.promise().commit();
                return StatusCodes.Created;

            })
            .catch(async (err) => {
                await connection.promise().rollback();
                console.error(`Erro ao processar dados >>> ${err}`);
                return StatusCodes.BadRequest;
            });

            return response;
            
        } catch(err) {
            await connection.promise().rollback();
            console.error(`Erro ao salvar aluno >>> ${err} >>> `, err);
            return StatusCodes.BadRequest;
        }
    }  
    
    private async generatePassword({nome = "", cpf}: AlunoProps):Promise<string> {
        const newPassWord:string = nome[0] + "@" + cpf?.replace(/\s/g, '');
        return hashSync(newPassWord, 10);
    }

    private async matricula({id_curso, cpf}: AlunoProps):Promise<boolean> {
        const resMatricula:boolean = await this.handle({fk_cpf_aluno_ma:cpf, id_curso_ma:id_curso});                    
        return resMatricula;                    
    }
}

export {CreateAlunoService};