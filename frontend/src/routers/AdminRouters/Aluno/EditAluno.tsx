import { useState, useEffect, useRef } from 'react';

import { ListAlunoProps } from '../../../props/alunoProps';

import { saveTokenProps } from '../../../props/loginProps';
import { AdminCursoService } from '../service/AdminCursoService';
import { AdminAlunoService } from '../service/AdminAlunoService';
import { FormDatas } from '../../../props/formProps';
import { FaRegAddressCard, FaRegCalendarAlt, FaUserAlt } from 'react-icons/fa';
import { FaGraduationCap, FaPhone } from 'react-icons/fa6';
import DatasForm from '../../../components/DatasForm';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingWrapper from '../../../components/layout/LoadingWrapper';

export default function EditAluno({token}: {token: saveTokenProps}) {

    const adminCursoService: AdminCursoService = new AdminCursoService(token);
    const adminAlunoService: AdminAlunoService = new AdminAlunoService(token);

    const {cpf} = useParams() as {cpf: string};
    const navigate = useNavigate();

    const [aluno, setAluno] = useState<ListAlunoProps | null>(null);
    
    const [cursoValueSelect, setCursosValueSelect] = useState({});
    const [loading, setLoading] = useState<boolean>(true);

    const nomeRef = useRef<HTMLInputElement | null>(null);
    const dataNascRef = useRef<HTMLInputElement | null>(null);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const telefoneRef = useRef<HTMLInputElement | null>(null);
    const idRef = useRef<HTMLInputElement>(null);
    const cursoRef = useRef<HTMLSelectElement | null>(null);

    const formDatas:FormDatas = {
        nome: {
            value: aluno?.nome ?? "",
            icon: FaUserAlt,
            disabled: true,
            type: 'text', 
            refInput: nomeRef,
        },
        data_de_nascimento: {
            value: aluno?.data_nascimento ?? '',
            icon: FaRegCalendarAlt,
            disabled: true,
            type: 'date', 
            refInput: dataNascRef,
        },
        CPF: {
            value: aluno?.cpf ?? '',
            icon: FaRegAddressCard,
            disabled: true,
            type: 'text', 
            refInput: cpfRef,
        },
        telefone: {
            value: aluno?.telefone ?? '',
            icon: FaPhone,
            disabled: false,
            type: 'text', 
            refInput: telefoneRef,
        },
        cursos: {
            value: aluno?.curso ?? '',
            valuesSelect: cursoValueSelect,
            type: 'select',
            disabled: false,
            refSelect: cursoRef,
            icon: FaGraduationCap,
        },
        id: {
            value: aluno?.id_aluno ?? '', 
            disabled: false,
            type: 'hidden',
            refInput: idRef,
        }
    };

    async function loadLists() {
        setLoading(true);
        const resultCursos = await adminCursoService.loadListCursos('filled');
        const resultAluno = await adminAlunoService.findByCpf({cpf});
        
        await valueSelect(resultCursos);

        setAluno(resultAluno);
        setLoading(false);
    }

     
    async function valueSelect(cursosList: []) {
        const objectValue:Record<string, string> = {};
        
        cursosList.map((val) => {
            const cursoArr = Object.entries(val);
            
            const key:string = cursoArr[0][1] as string;
            const value:string = cursoArr[1][1] as string;
            objectValue[key] = value;
        })

        setCursosValueSelect(objectValue);
    }

    useEffect(() => {
        loadLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    async function handleSubmit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();

        const alunoDatas:ListAlunoProps = {
            id_aluno: idRef.current?.value, 
            nome: nomeRef.current?.value, 
            data_nascimento: dataNascRef.current?.value.replace(/\//g, '-'),
            cpf: cpfRef.current?.value,
            telefone: telefoneRef.current?.value, 
            id_curso: cursoRef.current?.value
        }

        if(!await adminAlunoService.editAluno(alunoDatas)) return;
        setLoading(false);
        navigate('/admin/alunos');
    }

    return (
        // <>
        //     <DatasForm datas={formDatas} handleSubmit={handleSubmit} title="Editar aluno"/>           
        // </>
        <LoadingWrapper loading={loading}>
            <DatasForm datas={formDatas} handleSubmit={handleSubmit} title="Editar aluno"/>           
        </LoadingWrapper>
    )
}
