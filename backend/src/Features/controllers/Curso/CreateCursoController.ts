import { FastifyReply, FastifyRequest } from "fastify";

import { CursoProps } from "../../props/CursoProps";
import { ResponseProps } from "../../props/ResponseProps";

import { CreateCursoService } from "../../services/Curso/CreateCursoService";
import { StatusCodes } from "../../helper/statusResult";

class CreateCursoController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {nome} = req.body as CursoProps;

            const createCurso: CreateCursoService = new CreateCursoService();
            const result:ResponseProps = await createCurso.execute({nome});

            res.send(result);
            
        } catch (err) {
            console.error(`Erro ao criar novo curso ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {CreateCursoController};