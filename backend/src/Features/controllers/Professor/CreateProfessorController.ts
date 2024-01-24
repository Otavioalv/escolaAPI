import { FastifyReply, FastifyRequest } from "fastify";

import { CreateProfessorService } from "../../services/Professor/CreateProfessorService";

import { ProfessorProps } from "../../props/ProfessorProps";
import { ResponseProps } from "../../props/ResponseProps";
import { StatusCodes } from "../../helper/statusResult";

class CreateProfessorController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {

            const {nome, data_nascimento, telefone, cpf, diciplina, id_curso} = req.body as ProfessorProps
            
            const createProfessorService:CreateProfessorService = new CreateProfessorService();
            const professor:ResponseProps = await createProfessorService.execute({nome, data_nascimento, telefone, cpf, diciplina, id_curso});
            
            res.send(professor);

        } catch (err) {
            console.error(`Erro ao Cadastrar professor ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {CreateProfessorController};