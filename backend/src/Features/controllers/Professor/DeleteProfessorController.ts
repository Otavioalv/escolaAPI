import { FastifyReply, FastifyRequest } from "fastify";

import { DeleteProfessorProps, ProfessorProps } from "../../props/ProfessorProps";
import { ResponseProps } from "../../props/ResponseProps";

import { DeleteProfessorService } from "../../services/Professor/DeleteProfessorService";
import { StatusCodes } from "../../helper/statusResult";

class DeleteProfessorController {
    async handle(req:FastifyRequest, res:FastifyReply) {
        try{
            const {id_professor, cpf} = req.query as ProfessorProps;
            console.log(id_professor, cpf);
            const deleteProfessor:DeleteProfessorService = new DeleteProfessorService();
            const result:ResponseProps = await deleteProfessor.execute({id_professor, cpf});

            res.send(result);

        } catch(err) {
            console.error(`Erro ao deletar Aluno >>> ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {DeleteProfessorController};