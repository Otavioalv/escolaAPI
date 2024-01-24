import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";

// Aluno
import { ListAlunosController } from "../../../controllers/Aluno/ListAlunosController";
import { CreateAlunoController } from "../../../controllers/Aluno/CreateAlunoController";
import { DeleteAlunoController } from "../../../controllers/Aluno/DeleteAlunoController";
import { UpdateAlunoController } from "../../../controllers/Aluno/UpdateAlunoController";

// Professor
import { ListProfessorController } from "../../../controllers/Professor/ListProfessoresController";
import { CreateProfessorController } from "../../../controllers/Professor/CreateProfessorController";
import { UpdateProfessorController } from "../../../controllers/Professor/UpdateProfessorController";
import { DeleteProfessorController } from "../../../controllers/Professor/DeleteProfessorController";

// Curso
import { ListCursoController } from "../../../controllers/Curso/ListCursoController";
import { CreateCursoController } from "../../../controllers/Curso/CreateCursoController";
import { DeleteCursoController } from "../../../controllers/Curso/DeleteCursoController";
import { UpdateCursoController } from "../../../controllers/Curso/UpdateCursoController";

// Notas
import { ListNotasController } from "../../../controllers/Notas/ListNotasController";
import { UpdateNotaController } from "../../../controllers/Notas/UpdateNotaController";

// Login
import { LoginController } from "../login/LoginController";
import { CreateAdminConstroller } from "../../../controllers/Admin/CreateAdminController";
import { StatusCodes } from "../../../helper/statusResult";
import { ListAdminController } from "../../../controllers/Admin/ListAdminController";


const authenticatedRouteOptions = {
    preHandler: async (req:FastifyRequest, res:FastifyReply) => {
        const loginToken = new LoginController();
        
        const token = req.headers.authorization;
        if (!token) {
            res.send(StatusCodes.Unauthorized); 
            return;
        }

        const user:boolean =  await loginToken.verifyToken(token);
        if(!user) {
            res.send(StatusCodes.Unauthorized);
            return;
        }
    }
};
  

module.exports = async function routers(router:FastifyInstance, options: FastifyPluginOptions){
    
    router.post("/login", async(req:FastifyRequest, res:FastifyReply) => {
        return await new LoginController().handle(req, res);
    });
    
    router.get("/", async(req:FastifyRequest, res:FastifyReply) => {
        return {ok: true};
    });

    // ALUNO
    router.get("/alunos", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new ListAlunosController().handle(req, res);
    });

    router.post('/aluno/above-avarege', authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new ListAlunosController().findByAboveAvarege(req, res);
    });

    router.post("/aluno/findid", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new ListAlunosController().findById(req, res);
    });

    router.post("/aluno/findcpf", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new ListAlunosController().findByCpfAllDatas(req, res);
    })

    router.post("/aluno", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new CreateAlunoController().handle(req, res);
    });

    router.delete("/aluno", authenticatedRouteOptions, async(req: FastifyRequest, res: FastifyReply) => {
        return await new DeleteAlunoController().handle(req, res);
    });

    router.post("/aluno/edit", authenticatedRouteOptions, async(req: FastifyRequest, res:FastifyReply) => {
        return await new UpdateAlunoController().handle(req, res);
    });


    // PROFESSOR
    router.get("/professores", authenticatedRouteOptions,async (req:FastifyRequest, res: FastifyReply) => {
        return await new ListProfessorController().handle(req, res);
    });

    router.post("/professor/findbycpf", authenticatedRouteOptions,async (req:FastifyRequest, res: FastifyReply) => {
        return await new ListProfessorController().findByCpfAllDatas(req, res);
    });

    router.post("/professor", authenticatedRouteOptions,async (req:FastifyRequest, res: FastifyReply) => {
        return await new CreateProfessorController().handle(req, res);
    });

    router.delete('/professor', authenticatedRouteOptions, async (req:FastifyRequest, res:FastifyReply) => {
        return await new DeleteProfessorController().handle(req, res);
    });

    router.post('/professor/edit', authenticatedRouteOptions,async (req:FastifyRequest, res: FastifyReply) => {
        return await new UpdateProfessorController().handle(req, res); 
    });
    


    // CURSO
    router.get('/cursos', authenticatedRouteOptions,async (req: FastifyRequest, res: FastifyReply) => {
        return await new ListCursoController().handle(req, res);
    });

    router.post('/curso/findbyid', authenticatedRouteOptions, async (req: FastifyRequest, res: FastifyReply) => {
        return await new ListCursoController().findById(req, res);
    });

    router.post('/curso', authenticatedRouteOptions, async (req: FastifyRequest, res: FastifyReply) => {
        return await new CreateCursoController().handle(req, res);
    });

    router.delete('/curso', authenticatedRouteOptions, async (req:FastifyRequest, res: FastifyReply) => {
        return await new DeleteCursoController().handle(req, res);
    });

    router.post('/curso/edit', authenticatedRouteOptions, async (req: FastifyRequest, res: FastifyReply) => {
        return await new UpdateCursoController().handle(req, res);
    });


    // NOTAS
    router.get('/notas/:cpf_aluno', authenticatedRouteOptions, async (req:FastifyRequest, res:FastifyReply) => {
        return await new ListNotasController().handle(req, res);
    });

    router.post('/nota/edit/:cpf_aluno', authenticatedRouteOptions, async (req: FastifyRequest, res: FastifyReply) => {
        return await new UpdateNotaController().handle(req, res);
    });

    // ADMIN
    router.post('/register', authenticatedRouteOptions, async (req:FastifyRequest, res: FastifyReply) => {
        return await new CreateAdminConstroller().handle(req, res);
    });

    router.post('/admin', authenticatedRouteOptions, async (req: FastifyRequest, res: FastifyReply) => {
        return await new ListAdminController().findByToken(req, res);
    });

}

