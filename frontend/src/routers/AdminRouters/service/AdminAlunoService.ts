import { setMessage } from "../../../helper/messagePage";
import { StatusCodes } from "../../../helper/statusResult";
import { verificationDatas } from "../../../helper/verificationDatas2";

import { ListAlunoProps } from "../../../props/alunoProps";
import { saveTokenProps } from "../../../props/loginProps";
import { ListNotasProps } from "../../../props/notasProps";
import { ListResponseProps } from "../../../props/responseProps";

import { api } from "../../../services/api";


export class AdminAlunoService {
    private token?: saveTokenProps;

    constructor(token?: saveTokenProps) {
        this.token = token;
    }

    async loadAluno() {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const result = await api.get('/admin/alunos', {
                headers: {
                    Authorization: this.token.token
                }
            });

            const resultDatas = await result.data.rows;
            const resultResponse = await result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas;            
        } catch (err) {
            console.error(`Erro ao listar alunos >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async aboveAvarage() {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);

            const result = await api.post('/admin/aluno/above-avarege', {media: 6}, {
                headers: {Authorization: this.token.token}
            });
            const resultDatas = await result.data.rows;
            const resultResponse = await result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);

            return resultDatas;

        } catch (err) {
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async findById({id}: {id: string}) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!id) return await setMessage(StatusCodes.BadRequest);

            const result = await api.post('/admin/aluno/findid', {id}, {
                headers: {Authorization: this.token.token}
            });
            
            const resultData = await result.data.rows[0];
            const resultResponse = await result.data.StatusResponse as ListResponseProps;

            if(!resultData) {
                await setMessage(StatusCodes.UserNotFound);
                return false;
            }
            
            await setMessage(resultResponse);
            return resultData
            
        } catch (err) {
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }

    async findByCpf({cpf}: {cpf: string}) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!cpf) return await setMessage(StatusCodes.BadRequest);

            const result = await api.post('/admin/aluno/findcpf', {cpf}, {
                headers: {Authorization: this.token.token}
            });

            const resultData = await result.data.rows[0];

            return resultData;
        } catch (err) {
            console.error(`Erro na pesquisa >>> ${err}`);
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async editAluno({id_aluno, nome, data_nascimento, cpf, telefone, id_curso}: ListAlunoProps) {

        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            
            const alunoVerify: ListAlunoProps | false = await verificationDatas(id_aluno as string, nome, data_nascimento, cpf, telefone, id_curso as string, undefined, false, true);
            if(!alunoVerify) return await setMessage(StatusCodes.BadRequest);
            
            const result = await api.post('/admin/aluno/edit', alunoVerify, {
                headers: {Authorization: this.token.token}
            });

            
            const resultResponse = await result.data as ListResponseProps;
            const status:number = resultResponse.status ?? 200;

            await setMessage(resultResponse);

            if(status >= 400) return false;

            return true;

        } catch (err) {
            await setMessage(StatusCodes.InternalServerError);
            return true;
        }
    }

    async listNota({cpf}: {cpf: string}) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!cpf) return await setMessage(StatusCodes.BadRequest);
            
            const result = await api.get(`/admin/notas/${cpf}`, {
                headers: {Authorization: this.token.token}
            });

            const resultDatas:ListNotasProps = await result.data.rows[0];
            const resultResponse = await result.data.StatusResponse as ListResponseProps;

            await setMessage(resultResponse);
            
            return resultDatas;
        } catch (err) {
            await setMessage(StatusCodes.InternalServerError);
        }
    }

    async editNota({id_notas, media, notaA, notaB, notaC, situacao, cpf_aluno}: ListNotasProps) {
        try {
            if(!this.token) return await  setMessage(StatusCodes.InvalidLogin);
            if(!cpf_aluno) return await setMessage(StatusCodes.BadRequest);

            const notas: ListNotasProps = {id_notas, media, notaA, notaB, notaC, situacao, cpf_aluno};

            const result = await api.post(`/admin/nota/edit/${cpf_aluno}`, notas, {
                headers: {Authorization: this.token.token}
            });            
            
            const resultResponse = await result.data as ListResponseProps;
            const status:number = resultResponse.status ?? 200;

            await setMessage(resultResponse);

            if(status >= 400) return false; 
            
            return true;
        } catch (err) {
            await setMessage(StatusCodes.InternalServerError);
            return false;
        }
    }

    async deleteALuno({id_aluno, cpf}: ListAlunoProps) {
        try {
            if(!this.token) return await setMessage(StatusCodes.InvalidLogin);
            if(!id_aluno || !cpf) return await setMessage(StatusCodes.BadRequest);

            const result = await api.delete('/admin/aluno', {
                params: {
                    id_aluno,
                    cpf
                },
                headers: {Authorization: this.token.token}
            });

            const resultResponse = await result.data as ListResponseProps;
            
            await setMessage(resultResponse);

        } catch (err) {
            await setMessage(StatusCodes.InternalServerError);
        }
    }
}