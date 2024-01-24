import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";

import { CursoProps } from "../../props/CursoProps";
import { ResponseProps } from "../../props/ResponseProps";

class UpdateCursoService {
    async execute({nome, id_curso}: CursoProps){
        try {
            if(!nome || !id_curso) return StatusCodes.BadRequest;
            
            const response:ResponseProps = await connection.promise().query(
                `UPDATE curso 
                SET nome = ?
                WHERE id_curso = ?`,
                [nome, id_curso]
            )
            .then(() => {
                return StatusCodes.Success;
            })
            .catch(err => {
                console.error(`Erro ao salvar dados >>> ${err}`);
                return StatusCodes.BadRequest
            });

            return response;

            
        } catch (err) {
            console.error(`Erro ao Atualizar dados >>> ${err}`);
            return StatusCodes.BadRequest;
        }
    }
}

export {UpdateCursoService};