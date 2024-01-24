import { FormEvent, useRef, useState} from "react";

import { useNavigate } from "react-router-dom";
import DatasForm from "../../components/DatasForm";
import { FormDatas } from "../../props/formProps";
import { FaRegAddressCard, FaRegEye } from "react-icons/fa";
import { AlunoService } from "./service/AlunoService";
import { ListLoginProps } from "../../props/loginProps";
import LoadingWrapper from "../../components/layout/LoadingWrapper";


export default function LoginAluno() {
    const alunoService: AlunoService = new AlunoService();

    const cpfRef = useRef<HTMLInputElement | null>(null);
    const senhaRef = useRef<HTMLInputElement | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

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

    async function handleSubmit(e: FormEvent) {
        setLoading(true);
        e.preventDefault();

        const datas:ListLoginProps = {
            cpf: cpfRef.current?.value ?? "", 
            senha: senhaRef.current?.value ?? ""
        }   
        setLoading(false);
        if(await alunoService.LoginAluno(datas)) navigate('/aluno');
    }   

    return (
        <LoadingWrapper loading={loading}>
            <DatasForm datas={formDatas} handleSubmit={handleSubmit} title="Login aluno"/>
        </LoadingWrapper>
    );
}