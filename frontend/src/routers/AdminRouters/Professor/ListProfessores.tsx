import { useEffect, useState } from "react";

import { ListProfessorProps } from "../../../props/professorProps";
import { saveTokenProps } from "../../../props/loginProps";
import { AdminProfessorService } from "../service/AdminProfessorService";
import DatasUserList from "../../../components/DatasUserList";
import { DatasListButonsProps } from "../../../props/datasUserListProps";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";

export default function ListProfessores({token}: {token: saveTokenProps}) {

    const adminProfessorService: AdminProfessorService = new AdminProfessorService(token);

    const [list, setList] = useState<ListProfessorProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const buttonsList: DatasListButonsProps = {
        deleteProfessor: {
            actionDeleteProfessor: handleDelete,
            color: "red",
        },
        edit: {
            actionString: '/admin/professor/edit/${}',
            color: "blue"
        }
    }

    async function loadList() {
        setLoading(true);
        const result: ListProfessorProps[] = await adminProfessorService.loadProfessor();
        setList(result);
        setLoading(false);
    } 

    
    useEffect(() => {
        loadList(); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    

    async function handleDelete(id_professor:number, cpf:string) {
        setLoading(true);
        if(!await adminProfessorService.deleteProfessor({id_professor, cpf})) return setLoading(false);   

        const allProfessores = list.filter(list => list.id_professor !== id_professor);
        setList(allProfessores);
        setLoading(false);
    }

    return (
        <LoadingWrapper loading={loading}>
            <DatasUserList user={list as []} buttons={buttonsList} title="Lista de Professores" useImg={true}/>
        </LoadingWrapper>
    )
}