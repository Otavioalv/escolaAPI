import { FastifyReply, FastifyRequest } from "fastify";
import { ListAlunosService } from "../../services/Aluno/ListAlunosService";
import { ResultListProps } from "../../props/ResponseProps";
import { StatusCodes } from "../../helper/statusResult";
import { AlunoProps } from "../../props/AlunoProps";
import { LoginUserProps } from "../../props/LoginProps";


class ListAlunosController {
    private listAlunosService:ListAlunosService = new ListAlunosService();

    async handle(req: FastifyRequest, res: FastifyReply) {
        try{
            const results:ResultListProps = await this.listAlunosService.execute();  

            res.send(results);
        } catch(err) {
            console.error(`Erro ao processar listagens de alunos >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }      
    }

    async findByToken(req: FastifyRequest, res: FastifyReply) {
        try {
            const {token} = req.body as LoginUserProps
            const result:ResultListProps = await this.listAlunosService.findByToken({token});
            res.send(result);
        } catch (err) {
            console.error(`Erro ao processar usuario >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }

    async findByCpfAllDatas(req: FastifyRequest, res: FastifyReply) {
        try {
            const {cpf} = req.body as {cpf: string};
            const result:ResultListProps = await this.listAlunosService.findByCpfAllDatas({cpf});
            res.send(result);
        } catch (err) {
            console.error(`Erro interno no servidor >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }


    async findByCpf({cpf}: AlunoProps) {
        try {
            const result = await this.listAlunosService.findByCpf({cpf});
            return result;   
        } catch (err) {
            console.error(`Erro Interno no servidor >>> ${err}`);
            throw new Error(`Erro Interno no servidor >>> ${err}`);
        }
    }

    async findByTokenProfessor(req: FastifyRequest, res: FastifyReply) {
        try {
            const {token} = req.body as LoginUserProps
            const result = await this.listAlunosService.findByTokenProfessor({token});
            return result;
        } catch (err) {
            console.error(`Erro Interno no servidor >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }

    async findByAboveAvarege(req: FastifyRequest, res: FastifyReply) {
        try {
            const {media} = req.body as {media: string};
            const result = await this.listAlunosService.findByAboveAvarege({media});
            return result;
        } catch (err) {
            console.error(`Erro interno no servidor >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }

    async findById(req: FastifyRequest, res: FastifyReply) {
        try {
            const {id} = req.body as {id: string}
            const result = await this.listAlunosService.findById({id});
            return result;
        } catch(err) {
            console.error(`Erro interno no servider >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }
};  

export {ListAlunosController}; 