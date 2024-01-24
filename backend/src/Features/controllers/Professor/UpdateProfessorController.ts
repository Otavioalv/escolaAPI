import { FastifyReply, FastifyRequest } from "fastify";

import { UpdateProfessorService } from "../../services/Professor/UpdateProfessorService";

import { ProfessorProps } from "../../props/ProfessorProps";
import { ResponseProps } from "../../props/ResponseProps";
import { StatusCodes } from "../../helper/statusResult";

class UpdateProfessorController {
    async handle(req: FastifyRequest, res:FastifyReply) {
        try {
            
            const {id_professor, nome, data_nascimento, cpf, telefone, diciplina, id_curso, token} = req.body as ProfessorProps;
            const updateProfessor:UpdateProfessorService = new UpdateProfessorService();
            const result:ResponseProps = await updateProfessor.execute({id_professor, nome, data_nascimento, cpf, telefone, diciplina, id_curso, token});

            res.send(result);

        } catch (err) {
            console.error(`Erro >>> `, err);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {UpdateProfessorController};