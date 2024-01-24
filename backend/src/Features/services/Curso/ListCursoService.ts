import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";
import { CursoProps } from "../../props/CursoProps";

import { isFilledProps } from "../../props/IsFilledProps";
import { ResultListProps } from "../../props/ResponseProps";

class ListCursoService {
    async execute({isFilled}:isFilledProps) {
        try {

            if(isFilled === "filled"){
                const [rows, fields] = await connection.promise().query(
                    `SELECT id_curso, nome from curso, registerprofessor as rp 
                    WHERE curso.id_curso = rp.fk_id_curso_rp`
                );

                return { rows, StatusResponse: StatusCodes.Success } as ResultListProps;
            } else if(isFilled === "unfilled"){
                const [rows, fields] = await connection.promise().query(
                    `SELECT curso.id_curso, curso.nome
                    FROM curso
                    LEFT JOIN registerprofessor AS rp ON rp.fk_id_curso_rp = curso.id_curso
                    WHERE rp.fk_id_curso_rp IS NULL`
                );
                return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;
            }

            const [rows, fields] = await connection.promise().query(
                `SELECT id_curso, nome FROM curso`
            );

            return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;

        } catch (err) {
            console.error(`Erro na consulta >>> ${err}`);
            return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps
        }
    }

    async findById({id_curso}: {id_curso: string}) {
        try {
            if(!id_curso) return {rows: undefined, StatusResponse: StatusCodes.BadRequest} as ResultListProps;

            await connection.promise().beginTransaction();
            const [rows, fields] = await connection.promise().query(
                `select id_curso, nome from curso where id_curso = ?`,
                [id_curso]
            );
            await connection.promise().commit();

            return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro na consulta >>> ${err}`);
            return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
        }
    }
}

export {ListCursoService};