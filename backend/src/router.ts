import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { ListCustomersController } from "./controllers/ListAlunosController";


export async function routes(fastify:FastifyInstance, options: FastifyPluginOptions){
    
    fastify.get("/", async(req:FastifyRequest, res:FastifyReply) => {
        return {ok: true};
    });

    fastify.get("/alunos", async(req: FastifyRequest, res: FastifyReply) => {
        return new ListCustomersController().handle(req, res);
    })
}