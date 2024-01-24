import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";
import { LoginProps } from "../../props/LoginProps";
import {hashSync} from 'bcrypt';

class CreateAdminService {
    async execute({cpf, nome, senha, data_nascimento}: LoginProps) {
        if(!cpf || !nome || !senha || !data_nascimento || cpf.length !== 11 || senha.length < 5) return StatusCodes.BadRequest;
        
        const newDate = data_nascimento.substring(0, 10);
        
        try {
            const newPassword:string = hashSync(senha, 10);
            await connection.promise().beginTransaction();
            const result = await connection.promise().query(
                `INSERT INTO admin (nome, cpf, data_nascimento, senha) 
                VALUES (?, ?, ?, ?)`,
                [nome, cpf, newDate, newPassword]
            )
            .then(async () => {
                await connection.promise().commit();
                return StatusCodes.Created;
            })
            .catch(async err => {
                await connection.promise().rollback();
                return StatusCodes.BadRequest;
            }); 
            return result;
        } catch (err) {
            await connection.promise().rollback();
            
            console.error(`Erro ao salvar aluno >>> ${err} >>> `, err);
            return StatusCodes.InternalServerError;
        }
    }
}

export {CreateAdminService};