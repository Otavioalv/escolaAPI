import { connection } from "../../../model/db";

import { UpdateRegisterProfessorController } from "../../controllers/RegisterProfessor/UpdateRegisterProfessorController";
import { datasValidationProfessor } from "../../helper/datasValidationProfessor";
import { StatusCodes } from "../../helper/statusResult";
import { convertToken } from "../../helper/tokenValidation";
import { LoginUserProps } from "../../props/LoginProps";

import { ProfessorProps } from "../../props/ProfessorProps";
import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";

class UpdateProfessorService extends UpdateRegisterProfessorController {
    async execute({id_professor, nome, data_nascimento, cpf, telefone, diciplina, id_curso, token}: ProfessorProps) {
        try {
            var validation:boolean;

            if(id_professor) {
                validation = await datasValidationProfessor({id_professor, nome, data_nascimento, cpf, telefone, diciplina});
            } else if(token) {
                const user:LoginUserProps = await convertToken(token);
                id_professor = user.id;
                validation = await datasValidationProfessor({id_professor, nome, data_nascimento, cpf, telefone, diciplina});
            } else {
                return StatusCodes.BadRequest;
            }

            const registerProfessor:boolean = await this.register({cpf_professor_rp: cpf, id_curso_rp: id_curso});
            

            if(validation && registerProfessor && id_professor) {
                await connection.promise().beginTransaction();

                const response = await connection.promise().query(
                    `UPDATE professor 
                    SET telefone = ?,
                        diciplina = ?
                    WHERE id_professor = ?`, 
                    [telefone, diciplina, id_professor] 
                )
                .then(async () => {
                    await connection.promise().commit();
                    return StatusCodes.Success;
                })
                .catch(async (err) => {
                    await connection.promise().rollback();
                    console.error(`Erro ao salvar dados >>> ${err}`);
                    return StatusCodes.BadRequest;
                });

                return response;
            } else {
                await connection.promise().rollback();
                console.error(`Dador incompletos ou mal preenchidos`);
                return StatusCodes.BadRequest;
            }

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao deletar professor >>> ${err}`);
            return StatusCodes.InternalServerError;
        }
    }

    private async register({cpf_professor_rp, id_curso_rp}:RegisterProfessorProps):Promise<boolean>{
        const registerProfessor:boolean = await this.handle({cpf_professor_rp, id_curso_rp});
        return registerProfessor;
    }
}

export {UpdateProfessorService};