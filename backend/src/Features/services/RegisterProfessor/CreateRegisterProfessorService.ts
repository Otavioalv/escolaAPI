import { connection } from "../../../model/db";

import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";

class CreateRegisterProfessorService {
    async execute({cpf_professor_rp, id_curso_rp}:RegisterProfessorProps):Promise<boolean>{
        try {
            if(!cpf_professor_rp || !id_curso_rp) return false;
            
            const cpf:string = cpf_professor_rp;
            const idCurso:number = typeof id_curso_rp === "number"? id_curso_rp : parseInt(id_curso_rp);

            await connection.promise().beginTransaction();

            const res:boolean = await connection.promise().query(
                `INSERT INTO registerprofessor (fk_id_curso_rp, fk_cpf_professor_rp)
                VALUES (?, ?)`,
                [idCurso, cpf]
            ) .then(async () => {
                await connection.promise().commit();
                return true;
            }) .catch(async (err) => {
                await connection.promise().rollback();
                console.error(`Erro ao Processar dados de registro do professor >>> ${err}`);
                return false;
            })

            return res;

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao salvar registro >>> ${err}`);
            return false;
        }
    }
}


export {CreateRegisterProfessorService};