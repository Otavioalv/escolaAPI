import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";
import { convertToken } from "../../helper/tokenValidation";
import { AlunoProps } from "../../props/AlunoProps";
import { LoginUserProps, LoginProps } from "../../props/LoginProps";

import { ResultListProps } from "../../props/ResponseProps";


// da pra trocar fields por _ 
class ListAlunosService {
    async execute() {
      try{  

        await connection.promise().beginTransaction();
        
          const [rows, fields] = await connection.promise().query(
            `SELECT 
              aluno.id_aluno, 
              aluno.nome, 
              aluno.data_nascimento, 
              aluno.cpf, aluno.telefone, 
              curso.nome as curso,
              curso.id_curso as id_curso
            FROM 
              aluno,  
              curso, 
              matricula, 
              registerprofessor
            WHERE 
              matricula. fk_id_registerProfessor_ma = registerprofessor. id_registerProfessor
              AND registerprofessor.fk_id_curso_rp = curso.id_curso
              AND matricula.fk_cpf_aluno_ma = aluno.cpf
            ORDER BY aluno.id_aluno ASC`
          ) as [[], []];
  
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
        const user: LoginProps = await convertToken(token);

        console.log(user);

        await connection.promise().beginTransaction();
        
        const [rows, fields] = await connection.promise().query(
          `SELECT 
              aluno.id_aluno, 
              aluno.nome, 
              aluno.data_nascimento, 
              aluno.cpf, 
              aluno.telefone, 
              curso.nome as curso,
              curso.id_curso as id_curso
            FROM 
              aluno,  
              curso, 
              matricula, 
              registerprofessor
            WHERE 
              matricula. fk_id_registerProfessor_ma = registerprofessor. id_registerProfessor
              AND registerprofessor.fk_id_curso_rp = curso.id_curso
              AND matricula.fk_cpf_aluno_ma = aluno.cpf
              AND aluno.id_aluno = ?`, 
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

    async findByCpfAllDatas({cpf}: {cpf: string}) {
      try {
        if(!cpf) return {rows: undefined, StatusResponse: StatusCodes.BadRequest} as ResultListProps

        await connection.promise().beginTransaction();
        const [rows, fields] = await connection.promise().query(
          `SELECT 
              aluno.id_aluno, 
              aluno.nome, 
              aluno.data_nascimento, 
              aluno.cpf, aluno.telefone, 
              curso.nome as curso,
              curso.id_curso as id_curso
            FROM 
              aluno,  
              curso, 
              matricula, 
              registerprofessor
            WHERE 
              matricula. fk_id_registerProfessor_ma = registerprofessor. id_registerProfessor
              AND registerprofessor.fk_id_curso_rp = curso.id_curso
              AND matricula.fk_cpf_aluno_ma = aluno.cpf
              AND aluno.cpf = ?`, 
            [cpf]
        ) as [[], []];
        await connection.promise().commit();
        
        console.log(rows);
        return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;
        
      } catch (err) {
        await connection.promise().rollback();
        console.error(`Erro na consulta >>> ${err}`);
        return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
      }
    }


    async findByCpf({cpf}: AlunoProps) {
      try { 
        const [rowsArr, fields] = await connection.promise().query(
          `SELECT nome, cpf, senha, id_aluno as id FROM aluno WHERE cpf = ?`,
          [cpf]
        ) as [[], []];

        var row = {}

        rowsArr.map((val) => {
          row = val;
        });

        return row;

      } catch (err) {
          await connection.promise().rollback();
          console.error(`Erro ao Interno no servidor >>> ${err}`);
          throw new Error(`Erro ao Interno no servidor >>> ${err}`);
      }
    }

    async findByTokenProfessor({token}:LoginUserProps){
      try {
        if(!token) return {rows: undefined, StatusResponse: StatusCodes.BadRequest} as ResultListProps;        
        const user: LoginProps = await convertToken(token);        

        await connection.promise().beginTransaction();
        const [rows, fields] = await connection.promise().query(
          `SELECT 
            aluno.id_aluno,
            aluno.nome,
            aluno.cpf
          FROM 
            registerprofessor as register, 
            matricula, 
            aluno
          WHERE register.fk_cpf_professor_rp = ?
          AND matricula.fk_id_registerProfessor_ma = register.id_registerProfessor
          AND matricula.fk_cpf_aluno_ma = aluno.cpf`,
          [user.cpf]
        ) as [[], []];
        await connection.promise().commit();

        return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;

      } catch (err) {
        await connection.promise().rollback();
        console.error(`Erro ao Interno no servidor >>> ${err}`);
        return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
      }
    }

    async findByAboveAvarege({media}: {media: string}) {
      try {
        if(!media) return {rows: undefined, StatusResponse: StatusCodes.BadRequest} as ResultListProps;

        await connection.promise().beginTransaction();
        const [rows, fields] = await connection.promise().query(
          `SELECT 
            aluno.id_aluno, 
            aluno.nome, 
            aluno.data_nascimento, 
            aluno.cpf, aluno.telefone, 
            curso.nome as curso,
            curso.id_curso as id_curso
          FROM 
            notas, 
            matricula, 
            aluno,
            curso, 
            registerprofessor 
          WHERE 
            media >= ?
            AND matricula.fk_id_notas_ma = notas.id_notas 
            AND matricula.fk_cpf_aluno_ma = aluno.cpf
            AND matricula.fk_id_registerprofessor_ma = registerprofessor.id_registerprofessor
            AND curso.id_curso = registerprofessor.fk_id_curso_rp
          ORDER BY aluno.id_aluno ASC`,
          [media]
        ) as [[], []];
        await connection.promise().commit();
        
        return {rows, StatusResponse: StatusCodes.Success} as ResultListProps
      } catch (err) {
        await connection.promise().rollback();
        console.error(`Erro interno no servidor >>> ${err}`);
        return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
      }
    }


    async findById({id}: {id: string}) {
      try {
        if(!id) return {rows: undefined, StatusResponse: StatusCodes.BadRequest} as ResultListProps;

        await connection.promise().beginTransaction();
        const [rows, fields] = await connection.promise().query(
          `SELECT 
            aluno.id_aluno, 
            aluno.nome, 
            aluno.data_nascimento, 
            aluno.cpf, aluno.telefone, 
            curso.nome as curso,
            curso.id_curso as id_curso
          FROM 
            aluno,  
            curso, 
            matricula, 
            registerprofessor
          WHERE 
            matricula. fk_id_registerProfessor_ma = registerprofessor. id_registerProfessor
            AND registerprofessor.fk_id_curso_rp = curso.id_curso
            AND matricula.fk_cpf_aluno_ma = aluno.cpf
            AND aluno.id_aluno = ?
          ORDER BY aluno.id_aluno ASC`,
          [id]
        ) as [[], []];
        await connection.promise().commit();

        console.log(rows);
        return {rows, StatusResponse: StatusCodes.Success} as ResultListProps;
      } catch (err) {
        console.error(`Erro interno no servidor >>> ${err}`);
        return {rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps;
      }
    }
}

export {ListAlunosService};
