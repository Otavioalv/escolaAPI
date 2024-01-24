import { FastifyReply, FastifyRequest } from "fastify";
import { LoginProps, LoginUserProps } from "../../props/LoginProps";
import { ListAdminService } from "../../services/Admin/ListAdminService";
import { StatusCodes } from "../../helper/statusResult";
import { ResultListProps } from "../../props/ResponseProps";


class ListAdminController {
    private listAdminService: ListAdminService = new ListAdminService();   

    async findByCpf({cpf}: LoginProps) {
        try {   
            const admin = await this.listAdminService.findByCpf({cpf}) as LoginProps;
            return admin;   
        } catch (err) {
            console.error("Erro ao procurar");
            throw new Error("Erro ao procurar");
        }
    }

    async findByToken(req: FastifyRequest, res: FastifyReply) {
        try {
            const {token} = req.body as LoginUserProps
            const result:ResultListProps = await this.listAdminService.findByToken({token});
            
            res.send(result);
        } catch (err) {
            console.error(`Erro ao processar usuario >>> ${err}`);
            res.send({rows: undefined, StatusResponse: StatusCodes.InternalServerError} as ResultListProps);
        }
    }
}

export {ListAdminController};