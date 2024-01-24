import { setMessage } from "../../../helper/messagePage";
import { StatusCodes } from "../../../helper/statusResult";
import { verificationDatas } from "../../../helper/verificationDatas2";
import { saveTokenProps } from "../../../props/loginProps";
import { ListProfessorProps } from "../../../props/professorProps";
import { ListResponseProps } from "../../../props/responseProps";
import { api } from "../../../services/api";


export class AdminProfessorService {
    private token?: saveTokenProps;

    constructor(token?: saveTokenProps) {
        this.token = token
    }

    async loadProfessor() {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const result = await api.get('/admin/professores', {
                headers: {Authorization: this.token.token}
            })

            const resultDatas = await result.data.rows;
            const resultResponse = result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas; 
        } catch (err) {
            console.error(`Erro ao listar professor >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async findByCpf(cpf: string) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!cpf) return await setMessage(StatusCodes.BadRequest);

            const result = await api.post('/admin/professor/findbycpf', {cpf}, {
                headers: {Authorization: this.token.token}
            })

            const resultDatas = await result.data.rows[0];
            const resultResponse = result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas; 
        } catch (err) {
            console.error(`Erro ao listar professor >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async deleteProfessor({id_professor, cpf}: ListProfessorProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!id_professor || !cpf) return await setMessage(StatusCodes.BadRequest);

            console.log(id_professor, cpf);

            const result = await api.delete('/admin/professor', {
                params: {
                    id_professor, 
                    cpf,
                },
                headers: {Authorization: this.token.token}
            });

            console.log(result.data);

            const resultResponse = await result.data as ListResponseProps;
            const status: number = resultResponse.status ?? 200;
            
            await setMessage(resultResponse);

            if(status >= 400) return false;

            return true;
        } catch (err) {
            console.error(`Erro ao deletar >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }

    async editProfessor({cpf, data_nascimento, diciplina, id_curso, id_professor, nome, telefone}: ListProfessorProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            
            const professor = await verificationDatas(id_professor?.toString(), nome, data_nascimento, cpf, telefone, id_curso?.toString(), diciplina, true, true);

            if(!professor) return await setMessage(StatusCodes.BadRequest);

            const result = await api.post('/admin/professor/edit', professor, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            const status:number = resultResponse.status ?? 200;

            await setMessage(resultResponse);

            if(status >= 400) return false;

            return true;

        } catch (err) {
            console.error(`Erro ao deletar >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return true;
        }
    }
}