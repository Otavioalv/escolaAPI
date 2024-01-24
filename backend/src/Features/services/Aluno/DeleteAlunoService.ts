import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";

import { AlunoProps } from "../../props/AlunoProps";
import { ResponseProps } from "../../props/ResponseProps";

class DeleteAlunoService {
    async execute({id_aluno, cpf}: AlunoProps) {
        try {
            if(!id_aluno || !cpf || cpf?.length !== 11) return StatusCodes.BadRequest;

            await connection.promise().beginTransaction();

            const response:ResponseProps = await connection.promise().query(
                `DELETE notas, matricula, aluno
                    FROM matricula
                    LEFT JOIN notas ON matricula.fk_id_notas_ma = notas.id_notas
                    LEFT JOIN aluno ON matricula.fk_cpf_aluno_ma = aluno.cpf
                    WHERE matricula.fk_cpf_aluno_ma = ?`,
                [cpf]
            ).then(async () => {
                await connection.promise().commit();
                return StatusCodes.Success;
            }).catch(async (err) => {
                await connection.promise().rollback();
                console.error(`Erro ao Deleter Dados de aluno >>> `, err);
                return StatusCodes.BadRequest;
            });
            return response;
        } catch(err) {
            await connection.promise().rollback();
            console.error(`Erro na consulta >>> `, err);
            return StatusCodes.InternalServerError;
        }
    }
}

export {DeleteAlunoService};
