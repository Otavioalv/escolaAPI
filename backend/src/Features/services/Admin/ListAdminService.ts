import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";
import { convertToken } from "../../helper/tokenValidation";
import { LoginProps, LoginUserProps } from "../../props/LoginProps";
import { ResultListProps } from "../../props/ResponseProps";

class ListAdminService {
    async findByCpf({cpf}: LoginProps) {
        try {
            if(cpf?.length !== 11) throw new Error(`Cpf invalido`);
            
            await connection.promise().beginTransaction()

            const [rowsArr, fields] = await connection.promise().query(
                `SELECT senha, cpf, nome FROM admin WHERE cpf = ?`,
                [cpf]
            ) as [[], []];
            
            var row = {};            
            
            rowsArr.map((val) => {
                row = val 
            });

            return row;
        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao procurar administrador >>> ${err}`);
            throw new Error(`Erro ao procurar administrador >>> ${err}`);
        }
    }

    async findByToken({token}: LoginUserProps) {
        try {
            if(!token) return StatusCodes.BadRequest;
            const user: LoginProps = await convertToken(token);

            await connection.promise().beginTransaction();
            
            const [rows, fields] = await connection.promise().query(
                `SELECT 
                    id as id_admin, 
                    nome, 
                    data_nascimento, 
                    cpf 
                FROM 
                    admin
                WHERE 
                    cpf = ?`, 
                [user.cpf]
            ) as [[], []];
            await connection.promise().commit();
            
            return {rows, StatusResponse: StatusCodes.Success} as ResultListProps
    
            } catch (err){
                await connection.promise().rollback();
                console.error(`Erro na consulta >>> ${err}`);
                return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps
            }
    }
}

export {ListAdminService};