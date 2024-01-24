import { compareSync } from "bcrypt";
import { auth } from "../../../config";
import { ListAlunosController } from "../../../controllers/Aluno/ListAlunosController";
import { StatusCodes } from "../../../helper/statusResult";
import { LoginProps } from "../../../props/LoginProps";

import {sign, verify} from "jsonwebtoken";
import { ResultLoginProps } from "../../../props/ResponseProps";


class LoginService {
    private listAlunoController:ListAlunosController = new ListAlunosController();

    async handle({senha, cpf}: LoginProps) {
        try {
            if(!cpf || cpf.length !== 11) return {token: undefined, StatusResponse: StatusCodes.IncorrectCPF} as ResultLoginProps;
            
            const findAluno: LoginProps = await this.listAlunoController.findByCpf({cpf});
            if(!findAluno.senha) return {token: undefined, StatusResponse: StatusCodes.UserNotFound} as ResultLoginProps;

            console.log(senha);
            if(!senha) return {token: undefined, StatusResponse: StatusCodes.IncorrectPassword} as ResultLoginProps;
            const isSamePassword:boolean = compareSync(senha, findAluno.senha);
            
            console.log(compareSync(senha, findAluno.senha));
            
            if(!isSamePassword) return {token: undefined, StatusResponse: StatusCodes.IncorrectPassword} as ResultLoginProps;
            
            console.log(findAluno);
            
            const token = sign({cpf, nome: findAluno.nome, id: findAluno.id} as LoginProps, auth.secret, {expiresIn: auth.expires});
            return {token, StatusResponse: StatusCodes.Success} as ResultLoginProps;
        } catch (err) {
            console.error(`Erro ao realizar login >>> ${err}`);
            return {token: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultLoginProps;
        }
    }

    async verifyToken(token:string) {
        const decodedToken = verify(token, auth.secret) as LoginProps;

        const user:LoginProps = await this.listAlunoController.findByCpf({cpf: decodedToken.cpf});

        return user.cpf ? true : false;
    }
}

export {LoginService};