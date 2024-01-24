import { setMessage } from "../../../helper/messagePage";
import { setReload } from "../../../helper/reloadPage";
import { StatusCodes } from "../../../helper/statusResult";
import { saveToken } from "../../../helper/token";
import { verificationDatas } from "../../../helper/verificationDatas2";
import { ListAlunoProps } from "../../../props/alunoProps";

import { ListLoginProps, saveTokenProps } from "../../../props/loginProps";
import { ListNotasProps } from "../../../props/notasProps";
import { ListResponseProps } from "../../../props/responseProps";
import { api } from "../../../services/api";


export class AlunoService {
    private token?: saveTokenProps;

    constructor(token?: saveTokenProps) {
        this.token = token;
    }

    async loadAluno() {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const result = await api.post('/aluno/aluno', {token: this.token.token}, {
                headers: {Authorization: this.token.token}
            });

            const resultDatas = await result.data.rows[0] as ListAlunoProps;
            const resultResponse = await result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas;      
        } catch (err) {
            console.error(`Erro na solicitação >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return {} as ListAlunoProps
        }
    }

    async loadNota() {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const result = await api.post('/aluno/nota', {token: this.token.token}, {
                headers: {Authorization: this.token.token}
            });
           
            const resultDatas = await result.data.rows[0] as ListNotasProps;
            const resultResponse = await result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas;      
        } catch (err) {
            console.error(`Erro na solicitação`, err)
            await setMessage(StatusCodes.InternalServerError);
            return {} as ListNotasProps;
        }
    }   
    


    async EditAluno({nome, data_nascimento, cpf, telefone, curso}: ListAlunoProps) {

        try {
            if(!this.token) return setMessage(StatusCodes.InvalidLogin);

            const alunoVerify: ListAlunoProps | false = await verificationDatas(undefined, nome, data_nascimento, cpf, telefone, curso, undefined, false, false);
            if(!alunoVerify) return setMessage(StatusCodes.BadRequest);
            const aluno = {...alunoVerify, token: this.token.token};

            const result = await api.post("/aluno/aluno/edit", aluno, {
                headers: {Authorization: this.token.token}
            });

            console.log(result);
            const resultResponse = await result.data as ListResponseProps;
            const status: number = resultResponse.status ?? 200;

            await setMessage(resultResponse);

       
            if(status >= 400) {
                return false
            }
            return true; 

        } catch (err) {
            console.error(`Erro ao salvar alteração >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async LoginAluno({cpf, senha}: ListLoginProps) {
        try {
            if(!cpf || !senha|| cpf.length !== 11) return await setMessage(StatusCodes.BadRequest);

            const login: ListLoginProps = {cpf, senha};
            const result = await api.post('/aluno/login', login);

            await saveToken({token: result.data.token});

            const resultResponse = await result.data.StatusResponse as ListResponseProps;
            const status: number = resultResponse.status ?? 200;

            await setMessage(resultResponse);

            if(status >= 400) {
                return false;
            }
            
            await setReload();
            return true;

        } catch(err) {
            console.error(`Erro ao realizar login >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }

}