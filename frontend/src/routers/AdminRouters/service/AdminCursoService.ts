import { setMessage } from "../../../helper/messagePage";
import { StatusCodes } from "../../../helper/statusResult";
import { ListCursoProps } from "../../../props/cursoProps";
import { saveTokenProps } from "../../../props/loginProps";
import { ListResponseProps } from "../../../props/responseProps";
import { api } from "../../../services/api";


export class AdminCursoService {
    private token?: saveTokenProps;

    constructor(token?: saveTokenProps) {
        this.token = token;
    }

    async loadListCursos(isFilled:  "unfilled" | "filled" | "all") {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const result = await api.get('/admin/cursos', {
                params: {isFilled},
                headers: {Authorization: this.token.token}
            });
            
            const resultDatas = await result.data.rows;
            const resultResponse = result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas;

        } catch (err) {
            console.error(`Erro ao listar cursos >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async findById({id_curso}: {id_curso: string}) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!id_curso) return await setMessage(StatusCodes.BadRequest);
            
            const result = await api.post('/admin/curso/findbyid', {id_curso: id_curso}, {
                headers: {Authorization: this.token.token}
            });

            const resultDatas = await result.data.rows[0];
            const resultResponse = await result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas;
        } catch (err) {
            console.error(`Erro ao listar curso >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async deleteCurso(id: number) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!id) return await setMessage(StatusCodes.BadRequest);

            const result = await api.delete('/admin/curso', {
                params: {
                    id: id
                },
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            const status:number = resultResponse.status ?? 200;
            
            await setMessage(resultResponse);

            if(status >= 400) return false;

            return true;
        } catch (err) {
            console.error(`Erro ao listar cursos >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }

    async editCurso({nome, id_curso}: ListCursoProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!nome || !id_curso) return await setMessage(StatusCodes.BadRequest);

            const datas: ListCursoProps = {
                nome, 
                id_curso,
            };

            const result = await api.post('/admin/curso/edit', datas, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            const status:number = resultResponse.status ?? 200;

            await setMessage(resultResponse);
            if(status >= 400) return false;

            return true;            
        } catch (err) {
            console.error(`Erro ao editar curso >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }

    async registerCurso({nome}: ListCursoProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            
            const curso: ListCursoProps = {
                nome,
            };

            const result = await api.post('/admin/curso', curso, {
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            const status: number = resultResponse.status ?? 200;

            await setMessage(resultResponse);
            if(status >= 400) return false;
            
            return true;
        } catch (err) {
            console.error(`Erro ao criar curso >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }
}