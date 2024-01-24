import { FastifyReply, FastifyRequest } from "fastify";

import { ListProfessorService } from "../../services/Professor/ListProfessoresService";

import { ResultListProps } from "../../props/ResponseProps";
import { LoginProps, LoginUserProps } from "../../props/LoginProps";
import { StatusCodes } from "../../helper/statusResult";


class ListProfessorController {
    private listProfessorService:ListProfessorService = new ListProfessorService();

    async handle(req: FastifyRequest, res: FastifyReply) {
        try{
            const results:ResultListProps = await this.listProfessorService.execute();
            res.send(results);
        } catch(err) {
            console.error(`Erro ao processar listagens de alunos >>> ${err}`);
            res.status(500).send({error: `Erro interno do servidor`});
        }      
    }


    async findByToken(req: FastifyRequest, res: FastifyReply) {
        try {
            const {token} = req.body as LoginUserProps;
            const result:ResultListProps = await this.listProfessorService.findByToken({token});

            res.send(result);
        } catch (err) {
            console.error(`Erro ao processar usuario >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }

    async findByCpfAllDatas(req: FastifyRequest, res: FastifyReply) {
        try {   
            const {cpf} = req.body as {cpf: string};

            console.log(cpf);
            const result: ResultListProps = await this.listProfessorService.findByCpfAllDatas(cpf);
            res.send(result);
            
        } catch (err) {
            console.error(`Erro ao processar ussuario >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    } 


    async findByCpf({cpf}: LoginProps) {
        try {
            const professor = await this.listProfessorService.findByCpf({cpf}) as LoginProps;
            return professor; 
        } catch (err) {
            console.error(`Erro na consulta >>> ${err}`);
            throw new Error(`Erro na consulta >>> ${err}`);
        }
    }
};  

export {ListProfessorController}; 