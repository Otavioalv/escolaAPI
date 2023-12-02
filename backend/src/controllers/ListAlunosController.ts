import { FastifyReply, FastifyRequest } from "fastify";
import { ListCustomersService } from "../service/ListAlunosService";


class ListCustomersController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try{
            const listCustomerService = new ListCustomersService();
            const results = await listCustomerService.execute();

            console.log(results.rows);

            res.send(results);

        } catch(err) {

            console.error(`Erro ao processar listagens de alunos >>> ${err}`);
            
            res.status(500).send({error: "Erro interno do servidor"});

            throw new Error(`Erro ao processar listagens de alunos >>> ${err}`);
            
        }      
    }
};  

export {ListCustomersController}; 