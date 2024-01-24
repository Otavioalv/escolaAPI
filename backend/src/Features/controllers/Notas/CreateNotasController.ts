import { CreateNotasService } from "../../services/Notas/CreateNotasService";

class CreateNotasController {
    async handle():Promise<boolean>{
        try {
            
            const notaService:CreateNotasService = new CreateNotasService();
            const newNota:boolean = await notaService.execute();

            return newNota;
        } catch (err) {
            console.error(`Erro ao criar notas >>> ${err}`);
            return false;
        }
    }
}

export {CreateNotasController}; 