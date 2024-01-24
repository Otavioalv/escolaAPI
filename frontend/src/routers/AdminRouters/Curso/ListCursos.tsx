import { useEffect, useState } from "react";

import { ListCursoProps } from "../../../props/cursoProps";
import { saveTokenProps } from "../../../props/loginProps";
import { AdminCursoService } from "../service/AdminCursoService";
import DatasUserList from "../../../components/DatasUserList";
import { DatasListButonsProps } from "../../../props/datasUserListProps";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";


export default function ListCursos({token}: {token: saveTokenProps}) {

    const adminCursoService: AdminCursoService = new AdminCursoService(token);
    const [list, setList] = useState<ListCursoProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const listButtons: DatasListButonsProps = {
        deleteNota: {
            actionDeleteCurso: handleDelete,
            color: 'red'
        },
        edit: {
            actionString: '/admin/curso/edit/${}',
            color: "blue"
        }
    }

    async function loadList() {
        setLoading(true);
        const result = await adminCursoService.loadListCursos("all") as ListCursoProps[];
        setList(result);
        setLoading(false);
    }
    
    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleDelete(idCurso: number) {
        setLoading(true);
        if(!await adminCursoService.deleteCurso(idCurso)) return setLoading(false);
        
        const allList = list.filter(list => list.id_curso !== idCurso);
        setList(allList);
        setLoading(false);
    }


    return (
        <LoadingWrapper loading={loading}>
            <>  
                {list.map((individualList, index) => (
                    <DatasUserList user={[{nome: individualList.nome, id: individualList.id_curso}]} title="" useImg={false} buttons={listButtons} key={index}/>
                ))}
            </>
        </LoadingWrapper>
    );
}