import { connection } from "../../../model/db";

import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";

class DeleteRegisterProfessorService {
    async execute ({cpf_professor_rp}:RegisterProfessorProps):Promise<boolean>{
        try {
            if(!cpf_professor_rp) return false;

            await connection.promise().beginTransaction();
            
            const res:boolean = await connection.promise().query(
                `DELETE FROM registerprofessor 
                WHERE fk_cpf_professor_rp = ?`,
                [cpf_professor_rp]
            )
            .then(async () => {
                await connection.promise().commit();
                return true;
            })
            .catch(async (err) => {
                await connection.promise().rollback();
                console.error(`Erro ao processar dados de registro de professor >>> ${err}`);
                return false;
            });

            return res;
        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao deletar registro >>> ${err}`)
            return false;
        }
    }
}

export {DeleteRegisterProfessorService};