import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ListNotasProps } from "../../../props/notasProps";
import { saveTokenProps } from "../../../props/loginProps";
import { AdminAlunoService } from "../service/AdminAlunoService";
import DatasUserTable from "../../../components/DatasUserTable";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";


export default function IndividualNota({token}: {token: saveTokenProps}) {
    
    const adminAlunoService: AdminAlunoService = new AdminAlunoService(token);
    const {cpf_aluno} = useParams() as ListNotasProps;
    const [nota, setNota] = useState<ListNotasProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    async function loadList() {
        setLoading(true);
        const result = await adminAlunoService.listNota({cpf: cpf_aluno as string}) as ListNotasProps;    
        setNota(result);
        setLoading(false);
    }

    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    return (
        // <>
        //     <DatasUserTable datas={[{...nota}]} title="Nota"/>
        // </>

        <LoadingWrapper loading={loading}>
            <DatasUserTable datas={[{...nota}]} title="Nota"/>
        </LoadingWrapper>
    )
}