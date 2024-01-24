import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteCursoProps } from "../../props/CursoProps";
import { DeleteCursoService } from "../../services/Curso/DeleteCursoService";
import { ResponseProps } from "../../props/ResponseProps";
import { StatusCodes } from "../../helper/statusResult";

class DeleteCursoController {
    async handle(req: FastifyRequest, res: FastifyReply){
        try {
            const {id} = req.query as DeleteCursoProps;

            const deleteCuso:DeleteCursoService = new DeleteCursoService();
            const result:ResponseProps = await deleteCuso.execute({id});
            
            res.send(result);
            
        } catch (err) {
            console.error(`Erro ao deletar curso >>> ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {DeleteCursoController};