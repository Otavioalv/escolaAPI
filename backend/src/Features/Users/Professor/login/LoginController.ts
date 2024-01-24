import { FastifyReply, FastifyRequest } from "fastify";
import { StatusCodes } from "../../../helper/statusResult";
import { LoginProps } from "../../../props/LoginProps";
import { LoginService } from "./LoginService";
import { ResultLoginProps } from "../../../props/ResponseProps";


class LoginController {
    private loginService: LoginService = new LoginService();

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {cpf, senha} = req.body as LoginProps;
            const login = await this.loginService.execute({cpf, senha});

            res.send(login);
        } catch (err) {
            console.error(`Erro ao realizar login >>> ${err}`);
            res.send({token: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultLoginProps);
        }
    }

    async verifyToken(token:string) {
        const verify: boolean = await this.loginService.verifyToken(token);
        return verify;
    }
}

export {LoginController}