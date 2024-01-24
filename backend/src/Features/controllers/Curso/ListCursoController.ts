import { FastifyReply, FastifyRequest } from "fastify";

import { ListCursoService } from "../../services/Curso/ListCursoService";

import { ResultListProps } from "../../props/ResponseProps";
import { isFilledProps } from "../../props/IsFilledProps";
import { StatusCodes } from "../../helper/statusResult";
import { CursoProps } from "../../props/CursoProps";

class ListCursoController {
    private listCurso: ListCursoService = new ListCursoService();

    async handle(req:FastifyRequest, res: FastifyReply) {
        try {
            const {isFilled} = req.query as isFilledProps;

            const result:ResultListProps = await this.listCurso.execute({isFilled});
            
            return (result);
        } catch (err) {
            console.error(`Erro ao processar listagem de cursos >>> ${err}`)
            res.send(StatusCodes.InternalServerError);
        }
    }

    async findById(req: FastifyRequest, res: FastifyReply) {
        try {
            const {id_curso} = req.body as {id_curso: string};

            const result: ResultListProps = await this.listCurso.findById({id_curso});

            return result;
        } catch (err) {
            console.error(`Erro ao processar listagem >>> ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {ListCursoController}