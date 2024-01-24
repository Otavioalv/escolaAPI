import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";

import { DeleteCursoProps } from "../../props/CursoProps";
import { ResponseProps } from "../../props/ResponseProps";

class DeleteCursoService {
    async execute({id}: DeleteCursoProps){
        var response:ResponseProps;
        try {
            if(!id) return response = StatusCodes.BadRequest;

            response = await connection.promise().query(
                `DELETE FROM curso WHERE id_curso = ?`,
                [id]
            )
            .then(() => {
                return StatusCodes.Success
            })
            .catch(err => {
                console.error(`Erro ao deletar dados de Curso >>> ${err}`);
                return StatusCodes.BadRequest;
            });

            return response;

        } catch (err) {
            console.error(`Erro na consulta >>> ${err}`);
            return StatusCodes.InternalServerError;
        }
    }
}


export {DeleteCursoService};