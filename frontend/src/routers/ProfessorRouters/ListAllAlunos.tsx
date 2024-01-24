import { useEffect, useState } from "react";
import { saveTokenProps } from "../../props/loginProps";
import { ListAlunoProps } from "../../props/alunoProps";
import DatasUserList from "../../components/DatasUserList";
import { ProfessorService } from "./service/ProfessorService";
import LoadingWrapper from "../../components/layout/LoadingWrapper";


export default function ListAllAlunos({token}: {token:saveTokenProps}) {

    const professorService: ProfessorService = new ProfessorService(token);

    const [loading, setLoading] = useState<boolean>(true);
    const [list, setList] = useState<ListAlunoProps[]>([]);

    async function loadList() {
        setLoading(true);
        const result: ListAlunoProps[] = await professorService.LoadListAllAlunos();

        setList(result);
        setLoading(false);
    }

    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return(
        <LoadingWrapper loading={loading}>
            <>
                <DatasUserList user={list as []} title="Alunos"/>
            </>
        </LoadingWrapper>
    )
}