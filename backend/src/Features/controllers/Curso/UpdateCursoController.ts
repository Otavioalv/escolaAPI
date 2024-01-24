import { FastifyReply, FastifyRequest } from "fastify";

import { CursoProps } from "../../props/CursoProps";
import { ResponseProps } from "../../props/ResponseProps";

import { UpdateCursoService } from "../../services/Curso/UpdateCursoService";
import { StatusCodes } from "../../helper/statusResult";

class UpdateCursoController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {nome, id_curso} = req.body as CursoProps;

            const updateCurso:UpdateCursoService = new UpdateCursoService();
            const result:ResponseProps = await updateCurso.execute({nome, id_curso});

            res.send(result);
            
        } catch (err) {
            console.error(`Erro Interno no servidor >>> ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {UpdateCursoController};