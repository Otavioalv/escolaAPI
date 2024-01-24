import { FastifyReply, FastifyRequest } from "fastify";

import { DeleteAlunoService } from "../../services/Aluno/DeleteAlunoService";

import { AlunoProps } from "../../props/AlunoProps";
import { ResponseProps } from "../../props/ResponseProps";
import { StatusCodes } from "../../helper/statusResult";

class DeleteAlunoController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {id_aluno, cpf} = req.query as AlunoProps;

            const deleteAlunoService:DeleteAlunoService = new DeleteAlunoService();
            const aluno:ResponseProps = await deleteAlunoService.execute({ id_aluno, cpf });

            res.send(aluno);
        } catch(err) {
            console.error(`Erro ao Deletar aluno >>> ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {DeleteAlunoController};