import { FastifyReply, FastifyRequest } from "fastify";

import { AlunoProps } from "../../props/AlunoProps";
import { ResponseProps } from "../../props/ResponseProps";

import { UpdateAlunoService } from "../../services/Aluno/UpdateAlunoServices";
import { StatusCodes } from "../../helper/statusResult";

class UpdateAlunoController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            
            const {id_aluno, nome, data_nascimento, cpf, telefone, id_curso, token} = req.body as AlunoProps;
            const updateAlunoService:UpdateAlunoService = new UpdateAlunoService(); 
            const updateAluno:ResponseProps = await updateAlunoService.execute({id_aluno, nome, data_nascimento, cpf, telefone, id_curso, token});            

            res.send(updateAluno);

        } catch(err) {
            console.error("Erro ao atualizar aluno >>> ", err);
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {UpdateAlunoController};
