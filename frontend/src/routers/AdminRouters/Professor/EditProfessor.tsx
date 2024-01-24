import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react";
import { FaRegAddressCard, FaRegCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { FaGraduationCap, FaPhone } from 'react-icons/fa6';

import { ListProfessorProps } from "../../../props/professorProps";

import { saveTokenProps } from "../../../props/loginProps";
import { AdminProfessorService } from "../service/AdminProfessorService";
import { AdminCursoService } from "../service/AdminCursoService";
import DatasForm from "../../../components/DatasForm";
import { FormDatas } from "../../../props/formProps";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";

export default function EditProfessor({token}: {token: saveTokenProps}) {

    const adminProfessorService: AdminProfessorService = new AdminProfessorService(token);
    const adminCursoService: AdminCursoService = new AdminCursoService(token);

    const navigate = useNavigate();

    const {cpf} = useParams() as {cpf: string};

    const [professor, setProfessor] = useState<ListProfessorProps>();
    const [cursoValueSelect, setCursoValueSelect] = useState({});
    const [loading, setLoading] = useState<boolean>(true);

    const idRef = useRef<HTMLInputElement | null>(null); 
    const nomeRef = useRef<HTMLInputElement | null>(null);
    const dataNascRef = useRef<HTMLInputElement | null>(null);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const telefoneRef = useRef<HTMLInputElement | null>(null);
    const diciplinaRef = useRef<HTMLInputElement | null>(null);
    const cursoRef = useRef<HTMLSelectElement | null>(null);

    const datasForm: FormDatas = {
        nome: {
            disabled: true, 
            type: "text", 
            value: professor?.nome,
            icon: FaUserAlt,
            refInput: nomeRef
        },
        
        data_de_nascimento: {
            disabled: true, 
            type: 'date',
            value: professor?.data_nascimento as string ?? '',
            icon: FaRegCalendarAlt, 
            refInput: dataNascRef
        },
        CPF: {
            disabled: true,
            type: "text",
            value: professor?.cpf,
            icon: FaRegAddressCard,
            refInput: cpfRef,
        },
        telefoneRef: {
            disabled: false, 
            type: 'text',
            value: professor?.telefone,
            icon: FaPhone,
            refInput: telefoneRef,
        },
        diciplina: {
            disabled: false,
            type: "text",
            value: professor?.diciplina, 
            icon: FaGraduationCap,
            refInput: diciplinaRef,
        },
        curso: {
            disabled: false,
            type: "select",
            value: professor?.nomeCurso,
            valuesSelect: {...cursoValueSelect, [professor?.id_curso ?? '']: professor?.nomeCurso ?? ''},
            icon: FaGraduationCap,
            refSelect: cursoRef,
        },
        id: {
            disabled: true, 
            type: "hidden",
            value: professor?.id_professor,
            refInput: idRef
        }
    }



    async function loadList() {
        setLoading(true);
        const resultProfessor:ListProfessorProps = await adminProfessorService.findByCpf(cpf);
        const resultCursos = await adminCursoService.loadListCursos("unfilled");

        await valueSelect(resultCursos);

        setProfessor(resultProfessor);
        setLoading(false);
    }

    async function valueSelect(cursoList: []) {
        const objectValue: Record<string, string> = {};

        cursoList.map(val => {
            const cursoArr = Object.entries(val);

            const key: string = cursoArr[0][1] as string;
            const value: string = cursoArr[1][1] as string;

            objectValue[key] = value;
        });

        setCursoValueSelect(objectValue);
    }

    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();

        const professorNew: ListProfessorProps = {
            cpf: cpfRef.current?.value,
            data_nascimento: dataNascRef.current?.value, 
            diciplina: diciplinaRef.current?.value,
            id_curso: parseInt(cursoRef.current?.value ?? ''), 
            id_professor: parseInt(idRef.current?.value ?? ''), 
            nome: nomeRef.current?.value,
            telefone: telefoneRef.current?.value,
        }

        if(!await adminProfessorService.editProfessor(professorNew)) return setLoading(false);
        setLoading(false);
        navigate('/admin/professores');
    }

    return (
        <LoadingWrapper loading={loading}>
            <DatasForm datas={datasForm} handleSubmit={handleSubmit} title="Editar Professor"/>
        </LoadingWrapper>
    )
}