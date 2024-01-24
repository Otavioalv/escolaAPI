import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";
import { convertToken } from "../../helper/tokenValidation";
import { LoginProps, LoginUserProps } from "../../props/LoginProps";
import { ResultListProps } from "../../props/ResponseProps";

class ListProfessorService {
    async execute() {
        try{  

            await connection.promise().beginTransaction();
            
            const [rows, fields] = await connection.promise().query(
                `SELECT professor.id_professor, 
                    professor.nome,
                    professor.data_nascimento, 
                    professor.cpf, 
                    professor.telefone, 
                    professor.diciplina, 
                    curso.nome as nomeCurso,
                    curso.id_curso as id_curso
                FROM professor, 
                    registerprofessor register,
                    curso
                WHERE professor.cpf = register.fk_cpf_professor_rp  
                    AND register.fk_id_curso_rp = curso.id_curso
                ORDER BY professor.id_professor ASC`
            );

            await connection.promise().commit();

            return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;

        } catch(err) {
            await connection.promise().rollback();
            console.error("Erro na consulta >>> ", err);
            return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;

        } 
    }

    async findByToken({token}: LoginUserProps) {
        try {
            if(!token) return StatusCodes.BadRequest;
            const user = await convertToken(token);

            await connection.promise().beginTransaction();

            const [rows, fields] = await connection.promise().query(
                `SELECT professor.id_professor, 
                professor.nome,
                professor.data_nascimento, 
                professor.cpf, 
                professor.telefone, 
                professor.diciplina, 
                curso.nome as nomeCurso,
                curso.id_curso as id_curso
            FROM professor, 
                registerprofessor register,
                curso
            WHERE professor.cpf = register.fk_cpf_professor_rp  
                AND register.fk_id_curso_rp = curso.id_curso
                AND professor.id_professor = ?`, 
                [user.id]
            ) as [[], []];
            await connection.promise().commit();
            
            return {rows, StatusResponse: StatusCodes.Success} as ResultListProps
        } catch (err){
            await connection.promise().rollback();
            console.error(`Erro na consulta >>> ${err}`);
            return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps
        }
    }

    async findByCpfAllDatas(cpf: string) {
        try {
            if(!cpf) return {rows: undefined, StatusResponse: StatusCodes.BadRequest} as ResultListProps;

            await connection.promise().beginTransaction();
            const [rows, _] = await connection.promise().query(
                `SELECT professor.id_professor, 
                    professor.nome,
                    professor.data_nascimento, 
                    professor.cpf, 
                    professor.telefone, 
                    professor.diciplina, 
                    curso.nome as nomeCurso,
                    curso.id_curso as id_curso
                FROM professor, 
                    registerprofessor register,
                    curso
                WHERE professor.cpf = register.fk_cpf_professor_rp  
                    AND register.fk_id_curso_rp = curso.id_curso
                    AND professor.cpf = ?`,
                cpf
            ) as [[], []];

            await connection.promise().commit();
            return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro na consulta >>> ${err}`);
            return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
        }
    }

    async findByCpf({cpf}: LoginProps) {
        try {
            if(!cpf || cpf.length !== 11) throw new Error(`CPF invalido`);

            await connection.promise().beginTransaction();
            const [rowsArr, fields] = await connection.promise().query(
                `SELECT id_professor as id, nome, data_nascimento, cpf, telefone, diciplina, senha
                FROM professor WHERE cpf = ?`,
                [cpf]
            ) as [[], []];

            var row = {};
            rowsArr.map((val) => {
                row = val;
            })

            return row;
        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao processar >>> ${err}`);
            throw new Error(`Erro ao processar >>> ${err}`);
        }
    }
}

export {ListProfessorService};