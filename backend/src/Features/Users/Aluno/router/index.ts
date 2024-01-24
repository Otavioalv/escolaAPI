import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

import { LoginController } from "../login/LoginController";
import { ListNotasController } from "../../../controllers/Notas/ListNotasController";
import { StatusCodes } from "../../../helper/statusResult";
import { UpdateAlunoController } from "../../../controllers/Aluno/UpdateAlunoController";
import { ListAlunosController } from "../../../controllers/Aluno/ListAlunosController";

const authenticatedRouteOptions = {
    preHandler:async (req: FastifyRequest, res: FastifyReply) => {
        const loginToken = new LoginController();

        const token = req.headers.authorization;
        if(!token) {
            res.send(StatusCodes.Unauthorized);
            return 
        }

        const user: boolean = await loginToken.verifyToken(token);
        if(!user) {
            res.send(StatusCodes.Unauthorized);
            return;
        };
    }
}

module.exports = async function routers(router: FastifyInstance, options: FastifyPluginOptions) {
    router.get("/", async (req: FastifyRequest, res: FastifyReply) => {
        return {ok: true};
    });

    router.post("/login", async (req: FastifyRequest, res: FastifyReply) => {
        return await new LoginController().handle(req, res);
    });
    
    router.post("/aluno", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new ListAlunosController().findByToken(req, res);
    });

    router.post("/nota", authenticatedRouteOptions, async (req: FastifyRequest, res: FastifyReply) => {
        return await new ListNotasController().findByToken(req, res);
    });

    router.post("/aluno/edit", authenticatedRouteOptions, async(req: FastifyRequest, res:FastifyReply) => {
        return await new UpdateAlunoController().handle(req, res);
    });
}