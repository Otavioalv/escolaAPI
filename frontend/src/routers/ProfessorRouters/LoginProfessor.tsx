import { FormEvent, useRef, useState } from "react";
import { ListLoginProps } from "../../props/loginProps";
import { FormDatas } from "../../props/formProps";
import { FaRegAddressCard, FaRegEye } from "react-icons/fa";
import DatasForm from "../../components/DatasForm";
import { useNavigate } from "react-router-dom";
import { ProfessorService } from "./service/ProfessorService";
import LoadingWrapper from "../../components/layout/LoadingWrapper";


export default function LoginProfessor() {
    
    const professorService:ProfessorService = new ProfessorService();

    const [loading, setLoading] = useState<boolean>(false);

    const cpfRef = useRef<HTMLInputElement | null>(null);
    const senhaRef = useRef<HTMLInputElement | null>(null);

    const formDatas:FormDatas = {
        CPF: {
            value: undefined, 
            icon: FaRegAddressCard,
            type: "text",
            refInput: cpfRef,
            disabled: false,
        },
        senha: {
            value: undefined,
            icon: FaRegEye,
            type: "password",
            refInput: senhaRef,
            disabled: false,
        }
    }

    const navigate = useNavigate();
    async function handleSubmit(e: FormEvent) {
        setLoading(true);
        e.preventDefault();

        const datas: ListLoginProps = {
            cpf: cpfRef.current?.value ?? "",
            senha: senhaRef.current?.value ?? "",
        }

        setLoading(false);
        if(await professorService.LoginProfessor(datas)) navigate('/professor');
    }

    return (
        <LoadingWrapper loading={loading}>
            <DatasForm datas={formDatas} handleSubmit={handleSubmit} title="Login professor"/>
        </LoadingWrapper>
    );
}