import { FaRegAddressCard, FaGraduationCap, FaRegCalendarAlt, FaUserAlt, FaPhone} from 'react-icons/fa';

import { useEffect, useRef, useState } from "react";
import { saveTokenProps } from "../../props/loginProps";
import { ListAlunoProps } from "../../props/alunoProps";
import { AlunoService } from "./service/AlunoService";
import { useNavigate } from "react-router-dom";

import DatasForm from "../../components/DatasForm";
import { FormDatas } from '../../props/formProps';
import LoadingWrapper from '../../components/layout/LoadingWrapper';

export default function EditIndividualAluno({token}: {token: saveTokenProps}) {
    
    const alunoService: AlunoService = new AlunoService(token);

    const navigate = useNavigate();

    const nomeRef = useRef<HTMLInputElement | null>(null);
    const dataNascRef = useRef<HTMLInputElement | null>(null);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const telefoneRef = useRef<HTMLInputElement | null>(null);
    const cursoRef = useRef<HTMLSelectElement | null>(null);
    
    const [loading, setLoading] = useState<boolean>(true);

    const [aluno, setAluno] = useState<ListAlunoProps>({
        cpf: "",
        curso: "",
        data_nascimento: "", 
        nome: "",
        telefone: ""
    });

    const userDatas:FormDatas = {
        CPF: {
            value: aluno.cpf, 
            icon: FaRegAddressCard,
            type: "text",
            refInput: cpfRef,
            disabled: true,
        },
        curso: {
            value: aluno.curso,
            icon: FaGraduationCap,
            type: "select",
            id: aluno.id_curso as string,
            refSelect: cursoRef,
            disabled: true,
            valuesSelect: {[aluno.id_curso ?? ''] : aluno.curso ?? ''}
        },
        data_de_nascimento: {
            value: aluno.data_nascimento,
            icon: FaRegCalendarAlt,  
            type: "date",
            refInput: dataNascRef, 
            disabled: true,
        },
        nome: {
            value: aluno.nome,
            icon: FaUserAlt,
            type: "text",
            refInput: nomeRef,
            disabled: true,
        },
        telefone: {
            value: aluno.telefone,
            icon: FaPhone,
            type: "text",
            refInput: telefoneRef,
            disabled: false,
        }, 
    }

    async function loadList() {
        setLoading(true);
        const result = await alunoService.loadAluno() as ListAlunoProps;
        setAluno(result);
        setLoading(false);
    }

    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();

        const user: ListAlunoProps ={
            nome: nomeRef.current?.value,
            data_nascimento: dataNascRef.current?.value, 
            cpf: cpfRef.current?.value, 
            telefone: telefoneRef.current?.value,
            curso: cursoRef.current?.value
        }

        const response = await alunoService.EditAluno(user);        
        setLoading(false);
        if(response)navigate('/aluno');
    }

    return (
        <LoadingWrapper loading={loading}>
            <DatasForm datas={userDatas} handleSubmit={handleSubmit} title="Editar"/>
        </LoadingWrapper>
    );
}