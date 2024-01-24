import { setMessage } from "../../../helper/messagePage";
import { StatusCodes } from "../../../helper/statusResult";
import { verificationDatas } from "../../../helper/verificationDatas2";

import { ListAlunoProps } from "../../../props/alunoProps";
import { saveTokenProps } from "../../../props/loginProps";
import { ListProfessorProps } from "../../../props/professorProps";
import { ListResponseProps } from "../../../props/responseProps";

import { api } from "../../../services/api";


export class AdminUserService {
    private token?: saveTokenProps;

    constructor(token?: saveTokenProps) {
        this.token = token;
    }

    async registerAluno({nome, data_nascimento, cpf, telefone, id_curso}: ListAlunoProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
        
            const aluno = await verificationDatas(undefined, nome, data_nascimento, cpf, telefone, id_curso?.toString(), undefined, false, false);
            if(!aluno) return await setMessage(StatusCodes.BadRequest);

            const result = await api.post('/admin/aluno', aluno, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            const status:number = resultResponse.status ?? 200;

            await setMessage(resultResponse);

            if(status >= 400) return false;

            return true;
        } catch (err) {
            console.error(`Erro ao registrar ussuario >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }

    async registerProfessor({nome, data_nascimento, cpf, telefone, id_curso, diciplina}: ListProfessorProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            
            const professor = await verificationDatas(undefined, nome, data_nascimento, cpf, telefone, id_curso?.toString(), diciplina, true, false);
            if(!professor) return await setMessage(StatusCodes.BadRequest);

            const result = await api.post('/admin/professor', professor, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            const status:number = resultResponse.status ?? 200;

            await setMessage(resultResponse);

            if(status >= 400) return false;

            return true;
        } catch (err) {
            console.error(`Erro ao registrar ussuario >>> ${err}`);
            await setMessage(StatusCodes.BadRequest);
            return false;
        }
    }


}