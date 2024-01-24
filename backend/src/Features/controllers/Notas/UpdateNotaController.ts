import { FastifyReply, FastifyRequest } from "fastify";

import { NotaProps } from "../../props/NotaProps";

import { UpdateNotaService } from "../../services/Notas/UpdateNotaService";
import { ResponseProps } from "../../props/ResponseProps";
import { StatusCodes } from "../../helper/statusResult";

 class UpdateNotaController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {media, notaA, notaB, notaC, situacao} = req.body as NotaProps;
            const {cpf_aluno} = req.params as NotaProps;
            
            const updateNotaService: UpdateNotaService = new UpdateNotaService();
            const updateNota:ResponseProps = await updateNotaService.execute({cpf_aluno, media, notaA, notaB, notaC, situacao});
            
            res.send(updateNota);
        } catch (err) {
            console.error(`Erro ao atualizar nota >>> ${err}`);
            res.send(StatusCodes.InternalServerError);
        }
    }
 }

 export {UpdateNotaController};