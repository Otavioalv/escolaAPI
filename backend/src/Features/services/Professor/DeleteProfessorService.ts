import { connection } from "../../../model/db";

import { DeleteRegisterProfessorController } from "../../controllers/RegisterProfessor/DeleteRegisterProfessotController";
import { StatusCodes } from "../../helper/statusResult";

import { DeleteProfessorProps, ProfessorProps } from "../../props/ProfessorProps";
import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";

class DeleteProfessorService extends DeleteRegisterProfessorController{
    async execute({id_professor, cpf}: ProfessorProps) {
        try {
            if(!id_professor || !cpf) return StatusCodes.BadRequest;

            const resultRegister:boolean = await this.register({cpf_professor_rp:cpf});
            
            if(!resultRegister) return StatusCodes.BadRequest;
            
            await connection.promise().beginTransaction();
            const result = await connection.promise().query(
                `DELETE FROM professor WHERE id_professor = ?`,
                [id_professor]
            )
            .then(async () => {
                await connection.promise().commit();
                return StatusCodes.Success;
            })
            .catch(async err => {
                await connection.promise().rollback();
                console.error(`Erro ao deletar Dados de professor >>> ${err}`);
                return StatusCodes.BadRequest;
            });
            
            return result;

        } catch(err) {
            await connection.promise().rollback();
            console.error(`Erro na consulta >>> ${err}`);
            return StatusCodes.InternalServerError;
        }
    }

    private async register({cpf_professor_rp}:RegisterProfessorProps):Promise<boolean> {
        const result:boolean = await this.handle({cpf_professor_rp});
        return result;
    }
}

export {DeleteProfessorService}