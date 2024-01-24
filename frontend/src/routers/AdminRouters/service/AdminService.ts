import { setMessage } from "../../../helper/messagePage";
import { setReload } from "../../../helper/reloadPage";
import { StatusCodes } from "../../../helper/statusResult";
import { saveToken } from "../../../helper/token";
import { ListAdminProps } from "../../../props/adminProps";

import { ListLoginProps, saveTokenProps } from "../../../props/loginProps";
import { ListResponseProps } from "../../../props/responseProps";

import { api } from "../../../services/api";


export class AdminService {
    private token?: saveTokenProps;

    constructor(token?:saveTokenProps) {
        this.token = token;
    }

    async LoginAdmin({cpf, senha}: ListLoginProps) {
        try {
            if(!cpf || !senha|| cpf.length !== 11) return await setMessage(StatusCodes.BadRequest);   

            const login: ListLoginProps = {cpf, senha};
            const result = await api.post('/admin/login', login);

            await saveToken({token: result.data.token});

            const resultResponse = await result.data.StatusResponse as ListResponseProps;
            const status: number = resultResponse.status ?? 200;
            if(status >= 201) {
                return setMessage(resultResponse);
            }
            await setMessage(resultResponse);
            await setReload();

            return true;
        } catch (err) {
            console.error(`Erro ao realizar login >>> ${err}`);
        }
    }

    async registerAdmin ({cpf, senha, data_nascimento, nome}:ListLoginProps){
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!cpf || !senha || !data_nascimento || !nome) return setMessage(StatusCodes.BadRequest);

            const admin: ListLoginProps = {
                cpf,
                senha, 
                data_nascimento,
                nome,
            };

            const result = await api.post('/admin/register', admin, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            console.log(result.data);

            await setMessage(resultResponse);
        } catch (err) {
            console.error(`Erro ao criar administrador >>> ${err}`);
        }
    }

    async loadAdmin() {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const result = await api.post('/admin/admin', {token: this.token.token}, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = result.data.rows[0] as ListAdminProps;

            return resultResponse;
        } catch (err) {
            console.error(`Erro na solicitação >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return {} as ListAdminProps;
        }
    }
}