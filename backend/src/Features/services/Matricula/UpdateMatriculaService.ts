import { connection } from "../../../model/db";

import { MatriculaProps } from "../../props/MatriculaProps";

class UpdateMatriculaService {
    async execute({fk_cpf_aluno_ma, id_curso_ma}:MatriculaProps):Promise<boolean> {
        try {
            
            if(!fk_cpf_aluno_ma || !id_curso_ma) return false;

            await connection.promise().beginTransaction();

            await connection.promise().query(
                `UPDATE matricula 
                SET fk_id_registerProfessor_ma = (
                    SELECT id_registerProfessor 
                    FROM registerprofessor 
                    WHERE fk_id_curso_rp = ? 
                )
                WHERE fk_cpf_aluno_ma = ?`,
                [id_curso_ma as string, fk_cpf_aluno_ma]
            ).catch(err => {throw new Error(`Erro ao atualizar matricula`)})

            return true;
        } catch (err) {
            console.error(`Error >>> ${err}`);
            return false;
        }
    }
}

export {UpdateMatriculaService};