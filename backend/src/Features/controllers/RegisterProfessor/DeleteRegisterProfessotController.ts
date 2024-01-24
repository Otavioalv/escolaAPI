import { RegisterProfessorProps } from "../../props/RegisterProfessorProps";

import { DeleteRegisterProfessorService } from "../../services/RegisterProfessor/DeleteRegisterProfessorService";

class DeleteRegisterProfessorController {
    async handle({cpf_professor_rp}:RegisterProfessorProps):Promise<boolean> {
        try {
            const deleteRegisterProfessorService:DeleteRegisterProfessorService = new DeleteRegisterProfessorService();
            const registerProfessor:boolean = await deleteRegisterProfessorService.execute({cpf_professor_rp});

            return registerProfessor;

        } catch (err) {
            console.error(`Erro ao deletar registro do professor >>> ${err}`);
            return false;
        }
    }
}

export {DeleteRegisterProfessorController};