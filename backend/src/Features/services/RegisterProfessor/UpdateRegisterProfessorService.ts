import { connection } from "../../../model/db";
import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";

class UpdateRegisterProfessorService {
    async execute({cpf_professor_rp, id_curso_rp}:RegisterProfessorProps):Promise<boolean>{
        try {
            if(!cpf_professor_rp || !id_curso_rp) return false;
            
            await connection.promise().beginTransaction();

            const res:boolean = await connection.promise().query(
                `UPDATE registerprofessor
                SET fk_id_curso_rp = ?
                WHERE fk_cpf_professor_rp  = ?`,
                [id_curso_rp, cpf_professor_rp]
            )
            .then(async () => {
                await connection.promise().commit();
                return true;
            })
            .catch(async err => {
                await connection.promise().rollback();
                console.error(`Erro ao salvar dados >>> ${err}`);
                return false;
            });

            return res;

        } catch (err) {
            await connection.promise().rollback(); 
            console.error(`Error ao deletar registro do professor >>> ${err}`);
            return false;
        }
    }
}

export {UpdateRegisterProfessorService};