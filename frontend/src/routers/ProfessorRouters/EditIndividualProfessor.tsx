import { useEffect, useRef, useState } from "react";
import { saveTokenProps } from "../../props/loginProps";
import { ListProfessorProps } from "../../props/professorProps";
import { ProfessorService } from "./service/ProfessorService";
import { FormDatas } from "../../props/formProps";
import { FaGraduationCap, FaPhone, FaRegAddressCard, FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import {IoExtensionPuzzle} from 'react-icons/io5'
import DatasForm from "../../components/DatasForm";
import { useNavigate } from "react-router-dom";
import LoadingWrapper from "../../components/layout/LoadingWrapper";


export default function EditIndividualProfessor({token}: {token: saveTokenProps}) {
    
    const professorService: ProfessorService = new ProfessorService(token);

    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);

    const nomeRef = useRef<HTMLInputElement | null>(null);
    const dataNascRef = useRef<HTMLInputElement | null>(null);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const telefoneRef = useRef<HTMLInputElement | null>(null);
    const cursoRef = useRef<HTMLSelectElement | null>(null);
    const diciplinaRef = useRef<HTMLInputElement | null>(null);
    
    const [professor, setProfessor] = useState<ListProfessorProps>({
        cpf: "",
        diciplina: "",
        data_nascimento: "", 
        nome: "",
        telefone: "",
        nomeCurso: ""
    });

    const userDatas: FormDatas = {
        CPF: {
            value: professor.cpf,
            icon: FaRegAddressCard,
            type: 'text',
            disabled: true,
            refInput: cpfRef
        },
        diciplina: {
            value: professor.diciplina,
            icon: IoExtensionPuzzle,
            type:'text',
            disabled:true,
            refInput:diciplinaRef,
        },
        data_de_nascimento: {
            value: professor.data_nascimento,
            icon: FaRegCalendarAlt,
            type:'date',
            disabled:true,
            refInput:dataNascRef,
        },
        nome: {
            value: professor.nome,
            icon: FaUserAlt,
            type:'text',
            disabled:true,
            refInput:nomeRef,
        },
        curso: {
            value: professor.nomeCurso,
            icon: FaGraduationCap,
            type:'select',
            disabled:true,
            id: String(professor.id_curso), 
            refSelect: cursoRef,
            valuesSelect: {[professor.id_curso ?? '']: professor.nomeCurso ?? ''}
        },
        telefone: {
            value: professor.telefone,
            icon: FaPhone,
            type:'text',
            disabled:false,
            refInput:telefoneRef,
        },
    }

    async function loadList() {
        setLoading(true);
        const response = await professorService.loadProfessor() as ListProfessorProps;
        setProfessor(response);
        setLoading(false);
    }

    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();
        
        const user: ListProfessorProps = {
            nome: nomeRef.current?.value,
            data_nascimento: dataNascRef.current?.value,
            cpf: cpfRef.current?.value,
            telefone: telefoneRef.current?.value,
            id_curso: parseInt(cursoRef.current?.value ?? ""), 
            diciplina: diciplinaRef.current?.value,
        }

        const response = await professorService.editProfessor(user);
        setLoading(false);
        if(response) navigate('/professor');
    }

    return (
        <LoadingWrapper loading={loading}>
            <DatasForm datas={userDatas} handleSubmit={handleSubmit} title="Editar"/>
        </LoadingWrapper>
    );
}