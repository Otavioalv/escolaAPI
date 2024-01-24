import { setMessage } from "../../../helper/messagePage";
import { setReload } from "../../../helper/reloadPage";
import { StatusCodes } from "../../../helper/statusResult";
import { saveToken } from "../../../helper/token";
import { verificationDatas } from "../../../helper/verificationDatas2";
import { ListLoginProps, saveTokenProps } from "../../../props/loginProps";
import { ListProfessorProps } from "../../../props/professorProps";
import { ListResponseProps } from "../../../props/responseProps";
import { api } from "../../../services/api";


export class ProfessorService {
    private token?: saveTokenProps;

    constructor(token?: saveTokenProps) {
        this.token = token;
    }

    async loadProfessor() {
        try {
            if(!this.token) return setMessage(StatusCodes.InvalidLogin);
            const token = this.token;

            const result = await api.post('/professor/professor', {token: token.token}, {
                headers: {Authorization: token.token}
            });
            
            const resultDatas = await result.data.rows[0] as ListProfessorProps;
            const resultResponse = await result.data.StatusResponse as ListResponseProps;
            
            await setMessage(resultResponse);

            return resultDatas;
        } catch (err) {
            console.error(`Erro ao listar professor ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return {} as ListProfessorProps;
        }
    }

    async editProfessor({nome, data_nascimento, cpf, id_curso, diciplina, telefone}:ListProfessorProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const professorVerify = await verificationDatas(undefined, nome, data_nascimento, cpf, telefone, String(id_curso), diciplina, true, false);
            if(!professorVerify) return await setMessage(StatusCodes.BadRequest);

            const professor = {...professorVerify, token: this.token.token}

            const result = await api.post('/professor/professor/edit', professor, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;

            const status: number = resultResponse.status ?? 200;
            if(status >= 400) return await setMessage(resultResponse);

            await setMessage(resultResponse);
            
            return true;
        } catch(err) {
            console.error(`erro ao editar >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async LoadListAllAlunos() {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            const token = this.token;

            const result = await api.post('/professor/professor/allAlunos', {token: token.token}, {
                headers: {Authorization: token.token}
            });

            const resultRows = await result.data.rows;
            const resultResponse = result.data.StatusResponse as ListResponseProps;
            
            await setMessage(resultResponse);

            return resultRows;

        } catch (err) {
            console.error(`Erro ao listar seus alunos`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async LoginProfessor({cpf, senha}: ListLoginProps) {
        try {
            if(!cpf || !senha || cpf.length !== 11) return await setMessage(StatusCodes.BadRequest);

            const login: ListLoginProps = {cpf, senha};
            const result = await api.post('/professor/login', login);

            await saveToken({token: result.data.token});
            
            const resultResponse = await result.data.StatusResponse as ListResponseProps;
            const status: number = resultResponse.status ?? 200;
            
            if(status >= 201) return setMessage(resultResponse);

            await setReload();
            return true;
            
        } catch (err) {
            console.log(`Error ao realizar login: >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }
}