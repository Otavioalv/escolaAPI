import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";
import { UpdateRegisterProfessorService } from "../../services/RegisterProfessor/UpdateRegisterProfessorService";


class UpdateRegisterProfessorController{
    async handle({cpf_professor_rp, id_curso_rp}:RegisterProfessorProps):Promise<boolean>{
        try {
            const updateRegisterProfessorService: UpdateRegisterProfessorService = new UpdateRegisterProfessorService();
            const registerProfessor:boolean = await updateRegisterProfessorService.execute({cpf_professor_rp, id_curso_rp});

            return registerProfessor
        } catch (err) {
            console.error(`Error ao atualizar registro do professor >>> ${err}`);
            
            return false; 
        }
    }
}

export {UpdateRegisterProfessorController};