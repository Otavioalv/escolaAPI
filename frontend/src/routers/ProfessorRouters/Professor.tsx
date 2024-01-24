import { useEffect, useState } from "react";
import { saveTokenProps } from "../../props/loginProps";
import { ListProfessorProps } from "../../props/professorProps";
import { ProfessorService } from "./service/ProfessorService";
import { Reload } from "../../helper/reloadPage";
import DatasUserList from "../../components/DatasUserList";
import { ListAlunoProps } from "../../props/alunoProps";
import { DatasListButonsProps } from "../../props/datasUserListProps";
import LoadingWrapper from "../../components/layout/LoadingWrapper";


export default function Professor({token}: {token: saveTokenProps}) {
    Reload();

    const professorService: ProfessorService = new ProfessorService(token);

    const [loading, setLoading] = useState<boolean>(true);
    const [professor, setProfessor] = useState<ListProfessorProps | null>(null);
    const [listAllAlunos, setListAllAlunos] = useState<ListAlunoProps[]>([]);
    
    const professorArray = [
        {   
            id: professor?.id_professor,
            nome: professor?.nome,
            telefone: professor?.telefone, 
            CPF: professor?.cpf,
            data_de_nascimento: professor?.data_nascimento,
            curso: professor?.nomeCurso,
            diciplina: professor?.diciplina,
        }
    ];

    const datasListButtons: DatasListButonsProps = {
        edit: {
            actionString: '/professor/edit',
            color: "blue",
        }
    }

    async function loadProfessor() {
        setLoading(true);
        const professorData = await professorService.loadProfessor() as ListProfessorProps;
        const listAlunosData: ListAlunoProps[] = await professorService.LoadListAllAlunos();

        setProfessor(professorData);
        setListAllAlunos(listAlunosData);
        setLoading(false);
    }

    useEffect(() => {
        loadProfessor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <LoadingWrapper loading={loading}>
            <>
                <DatasUserList user={professorArray} title={undefined} buttons={datasListButtons}/>
                <DatasUserList user={listAllAlunos as []} title="Alunos"/>
            </>
        </LoadingWrapper>
    )
}