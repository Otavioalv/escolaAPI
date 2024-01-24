import { FastifyReply, FastifyRequest } from "fastify";

import { CreateAlunoService } from "../../services/Aluno/CreateAlunoService";

import { AlunoProps } from "../../props/AlunoProps";
import { ResponseProps } from "../../props/ResponseProps";

import { StatusCodes } from "../../helper/statusResult";

class CreateAlunoController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {nome, data_nascimento, telefone, cpf, id_curso} = req.body as AlunoProps;
            const alunoService:CreateAlunoService = new CreateAlunoService();
            
            const newAluno:ResponseProps = await alunoService.execute({nome, data_nascimento, cpf, telefone, id_curso});

            res.send(newAluno);
        } catch(err) {
            console.error(`Erro ao criar novo aluno >>> ${err}`);
            res.send(StatusCodes.InternalServerError);
        }    
    }
}

export {CreateAlunoController};