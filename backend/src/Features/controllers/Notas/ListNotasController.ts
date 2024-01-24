import { FastifyReply, FastifyRequest } from "fastify";

import { ListNotasService } from "../../services/Notas/ListNotasService";

import { NotaProps } from "../../props/NotaProps";
import { ResultListProps } from "../../props/ResponseProps";
import { StatusCodes } from "../../helper/statusResult";
import { LoginUserProps } from "../../props/LoginProps";


class ListNotasController {
    private listNotasService:ListNotasService = new ListNotasService();

    async handle(req:FastifyRequest, res: FastifyReply) {
        try {
            const {cpf_aluno} = req.params as NotaProps;
            const result:ResultListProps = await this.listNotasService.execute({cpf_aluno});
            
            res.send(result);

        } catch (err) {
            console.error(`Erro ao processar listagem de notas >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }

    async findByToken(req: FastifyRequest, res: FastifyReply) {
        try {
            const {token} = req.body as LoginUserProps;

            const result:ResultListProps = await this.listNotasService.findByToken({token});
            
            res.send(result);
        } catch (err) {
            console.error(`Erro ao Interno no servidor >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }   
    }
}

export {ListNotasController};