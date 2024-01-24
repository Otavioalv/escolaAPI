import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";
import { convertToken } from "../../helper/tokenValidation";
import { LoginUserProps } from "../../props/LoginProps";

import { NotaProps } from "../../props/NotaProps";
import { ResultListProps } from "../../props/ResponseProps";

class ListNotasService {
    async execute({cpf_aluno}:NotaProps) {
        try {

            if(cpf_aluno) {
                await connection.promise().beginTransaction();

                const [rows, fields] = await connection.promise().query(
                    `SELECT 
                        notas.id_notas,
                        notas.media,
                        notas.notaA,
                        notas.notaB,
                        notas.notaC,
                        notas.situacao
                    FROM notas, matricula 
                    WHERE matricula.fk_id_notas_ma = notas.id_notas 
                    AND matricula.fk_cpf_aluno_ma = ?`,
                    [cpf_aluno]
                );
                await connection.promise().commit();
                
                return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;
            } else {
                await connection.promise().beginTransaction();

                const [rows, fields] = await connection.promise().query(
                    `SELECT * FROM notas`
                );
                await connection.promise().commit();
                return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;
            }
        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao listar notas >>> ${err}`);
            return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
        }
    }

    async findByToken({token}: LoginUserProps) {
        try {
            if(!token) return StatusCodes.BadRequest;
            const user: LoginUserProps = await convertToken(token);

            await connection.promise().beginTransaction();
            const [rows, fields] = await connection.promise().query(
                `SELECT 
                    notas.id_notas,
                    notas.media,
                    notas.notaA,
                    notas.notaB,
                    notas.notaC,
                    notas.situacao
                FROM notas, matricula 
                WHERE matricula.fk_id_notas_ma = notas.id_notas 
                AND matricula.fk_cpf_aluno_ma = ?`,
                [user.cpf]
            );

            await connection.promise().commit();
            return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao Interno no servidor >>> ${err}`);
            return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
        }   
    }
}

export {ListNotasService};