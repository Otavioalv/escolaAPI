import { sign, verify } from "jsonwebtoken";
import { compareSync } from "bcrypt";

import { auth } from "../../../config";

import { ListAdminController } from "../../../controllers/Admin/ListAdminController";
import { LoginProps } from "../../../props/LoginProps";
import { StatusCodes } from "../../../helper/statusResult";
import { ResultLoginProps } from "../../../props/ResponseProps";

class LoginService {
    private listAdminController: ListAdminController = new ListAdminController();

    async execute({cpf, senha}:LoginProps) {
        try {
            if(!cpf || cpf.length !== 11) return {token: undefined, StatusResponse: StatusCodes.IncorrectCPF} as ResultLoginProps;
            
            const findAdmin:LoginProps = await this.listAdminController.findByCpf({cpf});
            if(!findAdmin.senha) return {token: undefined, StatusResponse: StatusCodes.UserNotFound} as ResultLoginProps;

            if(!senha) return {token: undefined, StatusResponse: StatusCodes.IncorrectPassword} as ResultLoginProps;
            const isSamePassword:boolean = compareSync(senha, findAdmin.senha);
            if(!isSamePassword) return {token: undefined, StatusResponse: StatusCodes.IncorrectPassword} as ResultLoginProps;

            const token = sign({cpf, nome: findAdmin.nome} as LoginProps, auth.secret, {expiresIn: auth.expires});

            return {token, StatusResponse: StatusCodes.Success} as ResultLoginProps;
        } catch (err) {
            console.error(`Erro ao realizar login >>> ${err}`);
            return {token: undefined, StatusResponse: StatusCodes.BadRequest} as ResultLoginProps
        }
    }

    async verifyToken(token:string) {
        const decodedToken = verify(token, auth.secret) as LoginProps;
        const user:LoginProps = await this.listAdminController.findByCpf({cpf: decodedToken.cpf});

        return user.cpf ? true : false;
    }
}

export {LoginService};
