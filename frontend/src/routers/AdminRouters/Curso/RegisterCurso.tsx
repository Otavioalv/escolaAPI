import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { saveTokenProps } from "../../../props/loginProps";
import { AdminCursoService } from "../service/AdminCursoService";
import DatasForm from "../../../components/DatasForm";
import { FormDatas } from "../../../props/formProps";
import { FaGraduationCap } from "react-icons/fa6";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";


export default function RegisterCurso({token}: {token: saveTokenProps}) {

    const adminCursoService: AdminCursoService = new AdminCursoService(token);

    const navigate = useNavigate();
    const nameRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const datasForm: FormDatas = {
        nome: {
            disabled: false, 
            type: "text", 
            value: '',
            icon: FaGraduationCap,
            refInput: nameRef,
        }
    }

    async function handleSubmit(e: FormEvent){
        setLoading(true);
        e.preventDefault();
        
        if(!await adminCursoService.registerCurso({nome: nameRef.current?.value as string})) return setLoading(false);

        setLoading(false);
        navigate('/admin/cursos');
    }

    return (
        <LoadingWrapper loading={loading}>
            <DatasForm datas={datasForm} handleSubmit={handleSubmit} title="Registrar curso"/>
        </LoadingWrapper>
    );
}