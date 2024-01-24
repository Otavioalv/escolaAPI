import { MatriculaProps } from "../../props/MatriculaProps";
import { UpdateMatriculaService } from "../../services/Matricula/UpdateMatriculaService";

class UpdateMatriculaConstroller {
    async handle({fk_cpf_aluno_ma, id_curso_ma}:MatriculaProps):Promise<boolean> {
        try {
            const updateMatriculaService: UpdateMatriculaService = new UpdateMatriculaService();
            const matricula:boolean = await updateMatriculaService.execute({fk_cpf_aluno_ma, id_curso_ma});

            return matricula;
            
        } catch (err) {
            console.error(`Erro ao atualizar matricula de aluno  >>> ${err}`);
            return false;
        }
    }
}

export {UpdateMatriculaConstroller};