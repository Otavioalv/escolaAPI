import { connection } from "../../../model/db";

class CreateNotasService {
    
    public async execute():Promise<boolean> {
        try {
            
            await connection.promise().beginTransaction();

            const res:boolean = await connection.promise().query(
                `INSERT INTO notas (notaA, notaB, notaC, media, situacao)
                VALUES (?, ?, ?, ?, ?)`,
                [null, null, null, null, null]
            )
            .then(async () => {
                await connection.promise().commit();
                return true;
            })
            .catch(async err => {
                await connection.promise().rollback();
                console.error(`Erro ao processar dados >>> ${err}`);
                return false;
            });

            return res;

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao salvar professro >>> ${err}`);
            return false;
        }
    }
 }

export {CreateNotasService};