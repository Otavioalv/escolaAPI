import { useEffect, useState } from "react";
import { saveTokenProps } from "../../props/loginProps";
import { AdminService } from "./service/AdminService";
import { ListAdminProps } from "../../props/adminProps";
import DatasUserList from "../../components/DatasUserList";
import LoadingWrapper from "../../components/layout/LoadingWrapper";

export default function Admin({token}: {token: saveTokenProps}) {

    const adminService: AdminService = new AdminService(token);

    const [admin, setAdmin] = useState<ListAdminProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const user = [
        {   
            id: admin?.id_admin,
            nome: admin?.nome,
            cpf: admin?.cpf,
            data_de_nascimento: '0000-00-00',
        }
    ]

    async function LoadAdmin() {
        setLoading(true);
        const resultAdmin = await adminService.loadAdmin() as ListAdminProps;

        setAdmin(resultAdmin);
        setLoading(false);
    }

    useEffect(() => {
        LoadAdmin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return (
        <LoadingWrapper loading={loading}>
            <DatasUserList user={user} title={undefined}/>
        </LoadingWrapper>
    )
}