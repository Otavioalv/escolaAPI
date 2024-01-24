import { FastifyReply, FastifyRequest } from "fastify";

import { LoginProps } from "../../../props/LoginProps";
import { LoginService } from "./LoginService";
import { StatusCodes } from "../../../helper/statusResult";
import { ResultLoginProps } from "../../../props/ResponseProps";

class LoginController {
    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const {cpf, senha} = req.body as LoginProps;

            const loginService: LoginService = new LoginService();
            const result = await loginService.handle({cpf, senha});
            res.send(result);
            
        } catch (err) {
            console.error(`Erro interno no servidor >>> ${err}`);
            res.send({token: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultLoginProps);
        }
    }

    async verifyToken(token:string) {
        const loginService:LoginService = new LoginService();
        const verify:boolean = await loginService.verifyToken(token);
        return verify;
    }
}

export {LoginController};