import { useEffect, useState } from 'react';

import { ListAlunoProps } from '../../../props/alunoProps';
import { saveTokenProps } from '../../../props/loginProps';
import { AdminAlunoService } from '../service/AdminAlunoService';
import DatasUserList from '../../../components/DatasUserList';

import { DatasListButonsProps } from '../../../props/datasUserListProps';
import SearchBar from '../../../components/SearchBar';
import Loading from '../../../components/Loading';
import LoadingWrapper from '../../../components/layout/LoadingWrapper';



export default function ListAlunos({token}: {token: saveTokenProps}) {

    const adminAlunoService: AdminAlunoService = new AdminAlunoService(token);  

    const [listAluno, setListAluno] = useState<ListAlunoProps[] | null >(null);
    const [loading, setLoading] = useState<boolean>(false);

    const listButtons:DatasListButonsProps = {
        deleteAluno: {
            actionDeleteAluno: handleDelete,
            color: 'red',
        },
        edit: {
            actionString: '/admin/aluno/edit/${}',
            color: 'blue',
        },
        edit_nota: {
            actionString: '/admin/aluno/nota/edit/${}',
            color: 'blue',
        },
        ver_nota: {
            actionString: '/admin/aluno/nota/${}',
            color: 'blue',
        },
    }


    async function loadList() {
        const result = await adminAlunoService.loadAluno();

        setListAluno(result);
    }

    useEffect(() => {   
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function findById(id: string) {
        setLoading(true);
        const result = await adminAlunoService.findById({id}) as ListAlunoProps;
        if(result) setListAluno([result]);
        setLoading(false);
        return;
    }
    

    async function handleDelete(idAluno: number, cpf: string ) {
        setLoading(true);

        const aluno:ListAlunoProps = {
            id_aluno: idAluno,
            cpf
        }

        await adminAlunoService.deleteALuno(aluno);

        const AllList = listAluno?.filter((list) => list.id_aluno !== idAluno);
        setListAluno(AllList ?? []);
        setLoading(false);
    }

    console.log(listAluno);

    return(
        <>
            {!listAluno ? (
                <Loading/>
            ) : (
                <LoadingWrapper loading={loading}>
                    <>
                        {listAluno.length ? (
                            <>
                                <SearchBar handle={findById} placeholder='Buscar por id'/>
                                <DatasUserList user={listAluno as []} title='Todos os alunos'  buttons={listButtons}/>
                            </>
                        ) : (
                            'Não há alunos cadastrados'
                        )}
                    </>
                </LoadingWrapper>
                
            )}
        </>
    )
}
