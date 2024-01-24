import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { LoginController } from "../login/LoginController";
import { ListProfessorController } from "../../../controllers/Professor/ListProfessoresController";
import { StatusCodes } from "../../../helper/statusResult";
import { UpdateProfessorController } from "../../../controllers/Professor/UpdateProfessorController";
import { ListAlunosController } from "../../../controllers/Aluno/ListAlunosController";



const authenticatedRouteOptions = {
    preHandler: async (req: FastifyRequest, res: FastifyReply) => {
        const loginToken = new LoginController();

        const token = req.headers.authorization;
        if(!token) {
            res.send(StatusCodes.Unauthorized);
            return;
        }

        const user: boolean = await loginToken.verifyToken(token);
        if(!user) {
            res.send(StatusCodes.Unauthorized);
            return;
        }
    }
}


module.exports = async function routers(router: FastifyInstance, options: FastifyPluginOptions) { 
    
    router.post("/login", async(req: FastifyRequest, res: FastifyReply) => {
        return await new LoginController().handle(req, res);
    });
    
    router.post("/professor", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new ListProfessorController().findByToken(req, res);
    });

    router.post("/professor/edit", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new UpdateProfessorController().handle(req, res);
    });

    router.post("/professor/allAlunos", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new ListAlunosController().findByTokenProfessor(req, res);
    })
}