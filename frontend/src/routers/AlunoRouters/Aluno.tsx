import { useEffect,  useState } from "react";
import { saveTokenProps } from "../../props/loginProps";
import { ListAlunoProps } from "../../props/alunoProps";

import { AlunoService } from "./service/AlunoService";
import { Reload } from "../../helper/reloadPage";
import { ListNotasProps } from "../../props/notasProps";

import DatasUserList from "../../components/DatasUserList";
import DatasUserTable from "../../components/DatasUserTable";
import { DatasListButonsProps } from "../../props/datasUserListProps";
import LoadingWrapper from "../../components/layout/LoadingWrapper";


export default function Aluno({token}: {token: saveTokenProps}) {
    Reload();

    const [aluno, setAluno] = useState<ListAlunoProps | null>(null);
    const [nota, setNota] = useState<ListNotasProps | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const alunoService: AlunoService = new AlunoService(token);

    const alunoArray = [
        {   
            id: aluno?.id_aluno,
            nome: aluno?.nome,
            data_de_nascimento: aluno?.data_nascimento,
            cpf: aluno?.cpf, 
            telefone: aluno?.telefone
        }
    ];

    const notaArary = [
        {
            id: nota?.id_notas,
            nota_1: nota?.notaA,
            nota_2: nota?.notaB,
            nota_3: nota?.notaC,
            media: nota?.media,
            situacao: nota?.situacao
        }
    ];

    const listButtons: DatasListButonsProps ={
        edit: {
            actionString: '/aluno/edit',
            color: "blue"
        }
    }

    async function LoadLists() {
        setLoading(true);
        const resultAluno = await alunoService.loadAluno() as ListAlunoProps;
        const resultNota = await alunoService.loadNota() as ListNotasProps;
        
        // console.log(resultAluno);
        // console.log(resultNota);

        setAluno(resultAluno);
        setNota(resultNota);
        setLoading(false);
    }
   
    useEffect(() => {
        LoadLists()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return(
        <LoadingWrapper loading={loading}>
            <>
                <DatasUserList user={alunoArray} title={undefined} buttons={listButtons}/>
                <DatasUserTable datas={notaArary} title="Nota"/>
            </>
        </LoadingWrapper>
    )
}