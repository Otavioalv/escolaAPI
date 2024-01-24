import { compareSync } from "bcrypt";
import { ListProfessorController } from "../../../controllers/Professor/ListProfessoresController";
import { LoginProps } from "../../../props/LoginProps";
import { auth } from "../../../config";
import { sign, verify } from "jsonwebtoken";
import { StatusCodes } from "../../../helper/statusResult";
import { ResultLoginProps } from "../../../props/ResponseProps";


class LoginService {
    private listProfessorController: ListProfessorController = new ListProfessorController();
    
    async execute({cpf, senha}: LoginProps) {
        
        try{
            if(!cpf || cpf.length !== 11) return {token: undefined, StatusResponse: StatusCodes.IncorrectCPF} as ResultLoginProps;
            
            const findProfessor: LoginProps = await this.listProfessorController.findByCpf({cpf});
            if(!findProfessor.senha) return {token: undefined, StatusResponse: StatusCodes.UserNotFound} as ResultLoginProps;

            if(!senha) return {token: undefined, StatusResponse: StatusCodes.IncorrectPassword} as ResultLoginProps;
            const isSamePassword:boolean = compareSync(senha, findProfessor.senha);
            if(!isSamePassword) return {token: undefined, StatusResponse: StatusCodes.IncorrectPassword} as ResultLoginProps;

            const token = sign({cpf, nome: findProfessor.nome, id: findProfessor.id} as LoginProps, auth.secret, {expiresIn: auth.expires});

            return {token, StatusResponse: StatusCodes.Success} as ResultLoginProps;
        }catch(err) {
            console.error(`Erro ao realizar login`);
            return {token: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultLoginProps;
        }

    }


    async verifyToken(token: string) {
        const decodedToken = verify(token, auth.secret) as LoginProps;
        const user:LoginProps = await this.listProfessorController.findByCpf({cpf: decodedToken.cpf});
        
        return user.cpf ? true : false;
    }
}

export {LoginService};