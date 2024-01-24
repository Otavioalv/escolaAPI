import { NotaProps } from "../../props/NotaProps";

import { DeleteNotaService } from "../../services/Notas/DeletaNotaService";

class DeleteNotaController{
    async handle({cpf_aluno}: NotaProps):Promise<boolean>{
        try {
            const deleteNotaService: DeleteNotaService = new DeleteNotaService();
            const result:boolean = await deleteNotaService.execute({cpf_aluno});

            return result;

        } catch (err) {
            console.error(`Erro ao deletar nota >>> ${err}`);
            return false;
        }
    }
}

export {DeleteNotaController};