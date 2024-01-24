import { MatriculaProps } from "../../props/MatriculaProps";
import { CreateMatriculaService } from "../../services/Matricula/CreateMatriculaService";

class CreateMatriculaController {
    async handle({fk_cpf_aluno_ma, id_curso_ma}:MatriculaProps):Promise<boolean> {
        try {
            
            const createMatriculaService:CreateMatriculaService = new CreateMatriculaService();
            const matricula:boolean = await createMatriculaService.execute({fk_cpf_aluno_ma, id_curso_ma});

            return matricula;

        } catch (err) {
            console.error(`Erro ao cadastrar matricula >>> ${err}`);
            return false;
        }
    }
}

export {CreateMatriculaController};