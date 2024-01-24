import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";
import { CreateRegisterProfessorService } from "../../services/RegisterProfessor/CreateRegisterProfessorService";


class CreateRegisterProfessorController {
    async handle({cpf_professor_rp, id_curso_rp}:RegisterProfessorProps):Promise<boolean> {
        try {

            const createRegisterProfessorService:CreateRegisterProfessorService = new CreateRegisterProfessorService();
            const registerProfessor:boolean = await createRegisterProfessorService.execute({cpf_professor_rp, id_curso_rp});

            return registerProfessor;

        } catch (err) {
            console.error(`Erro ao Cadastrar Registro do professor ${err}`);
            return false;
        }
    }
}

export {CreateRegisterProfessorController};