import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";

import { CursoProps } from "../../props/CursoProps";
import { ResponseProps } from "../../props/ResponseProps";

class CreateCursoService {
    async execute({nome} : CursoProps) {
        try {
            if(!nome) return StatusCodes.BadRequest;

            const response:ResponseProps = await connection.promise().query(
                `INSERT INTO curso (nome)
                VALUE (?)`, 
                [nome]
            )
            .then(() => {
                return StatusCodes.Created;
            })
            .catch(err => {
                console.error(`Erro ao processar dados ${err}`);
                return StatusCodes.BadRequest;
            });

            return response;
        } catch (err) {
            console.error(`Erro ao salvar curso >>> ${err}`);
            return StatusCodes.InternalServerError;
        }
    }
}

export {CreateCursoService};