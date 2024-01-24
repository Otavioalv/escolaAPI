import { connection } from "../../../model/db";
import { UpdateMatriculaConstroller } from "../../controllers/Matricula/UpdateMatriculaController";

import { datasValidationAluno } from "../../helper/datasValidationAluno";
import { StatusCodes } from "../../helper/statusResult";
import { convertToken } from "../../helper/tokenValidation";

import { AlunoProps } from "../../props/AlunoProps";
import { LoginUserProps } from "../../props/LoginProps";
import { ResponseProps } from "../../props/ResponseProps";

class UpdateAlunoService extends UpdateMatriculaConstroller{
    async execute({id_aluno, nome, data_nascimento, cpf, telefone, id_curso, token}: AlunoProps){
        try {
            var validation: boolean;
            var matriculaAluno: boolean;
            const SQL_CODE:string = 
                `UPDATE aluno 
                SET telefone = ?
                WHERE id_aluno = ?`;

            if(id_aluno){
                validation = await datasValidationAluno({id_aluno, data_nascimento, cpf, telefone, nome, id_curso});
                matriculaAluno = await this.matricula({cpf, id_curso});
            } else if(token) {
                const user: LoginUserProps = await convertToken(token);
                id_aluno = user.id;
                validation = await datasValidationAluno({id_aluno, data_nascimento, cpf, telefone, nome, id_curso});
                matriculaAluno = true;
            } else {
                return StatusCodes.BadRequest;
            }

            if(!validation || !matriculaAluno || !id_aluno) return StatusCodes.BadRequest;


            await connection.promise().beginTransaction();
            const response:ResponseProps = await connection.promise().query(
                SQL_CODE,
                [telefone, id_aluno]
            )
            .then(async () => {
                await connection.promise().commit();
                return StatusCodes.Success;
            }) 
            .catch(async err => {
                await connection.promise().rollback();
                console.error(`Erro ao Salvar dados >>> ${err}`);
                return StatusCodes.InternalServerError;
            });

            return response;

        } catch(err) {
            await connection.promise().rollback();
            console.error(`Erro ao editar dados >>> `, err);
            return StatusCodes.InternalServerError;
        }
    }

    private async matricula({cpf, id_curso}:AlunoProps):Promise<boolean> {
        const matriculaAluno:boolean = await this.handle({fk_cpf_aluno_ma: cpf, id_curso_ma: id_curso});
        return matriculaAluno;
    }
}

export {UpdateAlunoService};