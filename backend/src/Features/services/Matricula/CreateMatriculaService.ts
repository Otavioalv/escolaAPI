import { connection } from "../../../model/db";

import { CreateNotasController } from "../../controllers/Notas/CreateNotasController";
import { MatriculaProps } from "../../props/MatriculaProps";

class CreateMatriculaService extends CreateNotasController{
    async execute({fk_cpf_aluno_ma, id_curso_ma}:MatriculaProps):Promise<boolean> {
        try {
            const newNota:boolean = await this.createNota();

            if(!fk_cpf_aluno_ma || !id_curso_ma || !newNota) return false;

            const idCurso:number = typeof id_curso_ma === "number" ? id_curso_ma : parseInt(id_curso_ma);             

            await connection.promise().beginTransaction();

            const res:boolean = await connection.promise().query(
                `INSERT INTO matricula (fk_id_notas_ma, fk_id_registerProfessor_ma, fk_cpf_aluno_ma) 
                VALUES ((select id_notas from notas order by id_notas desc limit 1), (select id_registerProfessor from registerProfessor where fk_id_curso_rp = ?), ?)`,
                [idCurso, fk_cpf_aluno_ma]
            )
            .then(async () => {
                await connection.promise().commit();
                return  true;
            })
            .catch(async err => {
                await connection.promise().rollback();
                console.error(`Erro ao processar dados de matricula >>> ${err}`);
                return false;
            });
            
            return res;            
        } catch (err) {
            console.error(`Erro ao salvar matricula > >> ${err}`);
            return false;
        }
    }

    private async createNota():Promise<boolean> {
        const nota:boolean = await this.handle();
        return nota;
    }
}

export {CreateMatriculaService};
