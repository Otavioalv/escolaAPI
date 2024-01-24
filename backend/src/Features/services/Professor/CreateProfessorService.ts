import { connection } from "../../../model/db";

import { CreateRegisterProfessorController } from "../../controllers/RegisterProfessor/CreateRegisterProfessorController";
import { datasValidationProfessor } from "../../helper/datasValidationProfessor";
import { StatusCodes } from "../../helper/statusResult";

import { ProfessorProps } from "../../props/ProfessorProps";
import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";
import { ResponseProps } from "../../props/ResponseProps";

import { hashSync } from "bcrypt";


class CreateProfessorService extends CreateRegisterProfessorController{
    async execute({nome, data_nascimento, telefone, cpf, diciplina, id_curso}: ProfessorProps) {
        try {
            const newDate:string = data_nascimento?.toString().substring(0, 10) ?? "";
            const validation:boolean = await datasValidationProfessor({nome, data_nascimento: newDate, cpf, telefone, diciplina});
            if(!validation || !id_curso) return StatusCodes.BadRequest;

            const password:string = await this.generatePassword({nome, cpf});
            
            await connection.promise().beginTransaction();
            const res:ResponseProps = await connection.promise().query(
                `INSERT INTO professor (nome, data_nascimento, cpf, telefone, diciplina, senha)
                VALUE (?, ?, ?, ?, ?, ?)`,
                [nome, newDate, cpf, telefone, diciplina, password]
            ) 
            .then(async () => {

                    const newRegisterProfessor:boolean = await this.register({cpf_professor_rp: cpf, id_curso_rp: id_curso});
                    if(newRegisterProfessor) return StatusCodes.Success;
                    
                    return StatusCodes.BadRequest;
            }).catch(async (err) => {
                console.error(`Erro ao Processar dados de professor >>> ${err}`);
                return StatusCodes.InternalServerError
            }); 

            if(res.status && res.status >= 400) {
                await this.deleteLastRegister();
                return res;
            };

            await connection.promise().commit();
            return res;

        } catch (err) {
            await connection.promise().rollback();
            console.error("Erro ao salvar professor >>> ", err);
            return StatusCodes.InternalServerError;
        }
    }

    private async generatePassword({nome="", cpf}:ProfessorProps):Promise<string> {
        const newPassWord:string = nome[0] + "@" + cpf?.replace(/\s/g, '');
        
        return hashSync(newPassWord, 10);
    }

    private async register({cpf_professor_rp, id_curso_rp}:RegisterProfessorProps):Promise<boolean> {
        const registerProfessor:boolean = await this.handle({cpf_professor_rp, id_curso_rp});
        return registerProfessor;
    }

    private async deleteLastRegister():Promise<boolean> {
        const res:boolean = await connection.promise().query( 
            `DELETE FROM professor 
            WHERE id_professor = 
            (SELECT MAX(id_professor) 
                FROM (SELECT id_professor from professor) AS temp LIMIT 1)`
        )
        .then(async () => {
            return true;
        })
        .catch(async err => {
            console.error(`Erro ao deletar ultimo registro de professor >>> ${err}`);
            return false;
        });

        return res;
    }
}

export {CreateProfessorService};