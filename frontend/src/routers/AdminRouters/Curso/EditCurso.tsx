import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ListCursoProps } from "../../../props/cursoProps";
import { saveTokenProps } from "../../../props/loginProps";
import { FormDatas } from "../../../props/formProps";
import { FaGraduationCap } from "react-icons/fa6";
import DatasForm from "../../../components/DatasForm";
import { AdminCursoService } from "../service/AdminCursoService";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";


export default function EditCurso({token}: {token: saveTokenProps}) {
    
    const adminCursoService: AdminCursoService = new AdminCursoService(token);

    const navigate = useNavigate();
    const {id} = useParams() as {id: string};
    const [cursos, setCursos] = useState<ListCursoProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const cursoRef = useRef<HTMLInputElement | null>(null);

    const datasForm: FormDatas = {
        nome: {
            disabled: false,
            type: "text", 
            value: cursos?.nome,
            icon: FaGraduationCap,
            refInput: cursoRef
        }
    }

    async function loadList() {
        setLoading(true);
        const result:ListCursoProps= await adminCursoService.findById({id_curso: id});
        setCursos(result);
        setLoading(false);
    }

    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();

        const datasCurso: ListCursoProps = {
            nome: cursoRef.current?.value as string,
            id_curso: parseInt(id),
        }
        if(!await adminCursoService.editCurso(datasCurso)) return setLoading(false);
        navigate('/admin/cursos');
    }


    return (
    //    <>
    //    </>
        <LoadingWrapper loading={loading}>
            <DatasForm datas={datasForm} handleSubmit={handleSubmit} title="Editar Curso"/>
        </LoadingWrapper>
    )
}