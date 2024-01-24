import { connection } from "../../../model/db";
import { StatusCodes } from "../../helper/statusResult";

import { NotaProps } from "../../props/NotaProps";
import { ResponseProps } from "../../props/ResponseProps";

class UpdateNotaService {
    async execute({cpf_aluno, id_notas, media, notaA, notaB, notaC, situacao}:NotaProps){
        try {
            const verif:boolean = await this.verificationDatas({cpf_aluno, id_notas, media, notaA, notaB, notaC, situacao});

            if(!verif) return StatusCodes.BadRequest;
            

            await connection.promise().beginTransaction();
            
            const response:ResponseProps = await connection.promise().query(
                `UPDATE notas, matricula 
                SET notas.notaA = ?,
                    notas.notaB = ?,
                    notas.notaC = ?,
                    notas.media  = ?,
                    notas.situacao = ?
                WHERE matricula.fk_id_notas_ma = notas.id_notas 
                AND matricula.fk_cpf_aluno_ma = ?`,
                [notaA, notaB, notaC, media, situacao, cpf_aluno]
            )
            .then(async () => {
                await connection.promise().commit();
                return StatusCodes.Success;
            })
            .catch(async err => {
                await connection.promise().rollback();
                console.error(`Erro ao salvar dados de nota ${err}`);
                return StatusCodes.BadRequest;
            });

            return response;

        } catch (err) {
            await connection.promise().rollback();
            console.error(`Erro ao salvar nota >>> ${err}`);
            return StatusCodes.BadRequest;
        }
    }

    private async verificationDatas({cpf_aluno, id_notas, media, notaA, notaB, notaC, situacao}:NotaProps):Promise<boolean> {
        if(!cpf_aluno || !media || !notaA || !notaB || !notaC || !situacao) 
            return false;

        return true;
    }
}

export {UpdateNotaService};