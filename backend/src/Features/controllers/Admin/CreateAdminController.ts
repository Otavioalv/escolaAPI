import { FastifyReply, FastifyRequest } from "fastify";
import { CreateAdminService } from "../../services/Admin/CreateAdminService";
import { LoginProps } from "../../props/LoginProps";
import { StatusCodes } from "../../helper/statusResult";


class CreateAdminConstroller {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {cpf, nome, senha, data_nascimento} = req.body as LoginProps;

            const createAdminService:CreateAdminService = new CreateAdminService();
            const admin = await createAdminService.execute({cpf, nome, senha, data_nascimento});
            res.send(admin);
        } catch (err) {
            console.error("Erro ao criar administrador");
            res.send(StatusCodes.InternalServerError);
        }
    }
}

export {CreateAdminConstroller};