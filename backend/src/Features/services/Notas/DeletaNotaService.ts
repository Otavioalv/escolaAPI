import { connection } from "../../../model/db";

import { NotaProps } from "../../props/NotaProps";

class DeleteNotaService {
    async execute({cpf_aluno}: NotaProps):Promise<boolean>{
        try {
            if(!cpf_aluno) return false;

            await connection.promise().beginTransaction();

            const res = await connection.promise().query(
                `DELETE FROM notas 
                WHERE id_notas = ?`,
                [cpf_aluno]  
            )
            .then(async () => {
                await connection.promise().commit();
                return true;
            })
            .catch(async err => {
                await connection.promise().rollback();
                console.error(`Erro ao Deletar dados de nota >>> ${err}`);
                return false;
            });

            return res;

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao deletar nota >>> ${err}`);
            return false;
        }
    }
}

export {DeleteNotaService};