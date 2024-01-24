import { FormEvent, useEffect, useRef, useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { saveTokenProps } from "../../props/loginProps";
import { AdminCursoService } from "./service/AdminCursoService";
import { AdminUserService } from "./service/AdminUserService";
import { ListAlunoProps } from "../../props/alunoProps";
import { ListProfessorProps } from "../../props/professorProps";
import HanddleButton from "../../components/layout/HanddleButton";
import DatasForm from "../../components/DatasForm";
import { FormDatas } from "../../props/formProps";
import { FaGraduationCap, FaPhone, FaRegAddressCard } from "react-icons/fa6";
import { FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import { IoExtensionPuzzle } from "react-icons/io5";
import LoadingWrapper from "../../components/layout/LoadingWrapper";


export default function RegisterUser({token}: {token: saveTokenProps}) {
    
    const adminCursoService: AdminCursoService = new AdminCursoService(token);
    const adminUserService: AdminUserService = new AdminUserService(token);
    
    // const navigate = useNavigate();
    
    const [loading, setLoading] = useState<boolean>(false);
    const [choiceReg, setChoiceReg] = useState<boolean>(true);
    const [cursoValueSelect, setCursosValueSelect] = useState({});

    const nomeRef = useRef<HTMLInputElement | null>(null);
    const dateNascRef = useRef<HTMLInputElement | null>(null);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const telefoneRef = useRef<HTMLInputElement | null>(null);
    const diciplinaRef = useRef<HTMLInputElement | null>(null);
    const cursoRef = useRef<HTMLSelectElement | null>(null);

    const userForm: FormDatas = {
        nome: {
            value: '',
            icon: FaUserAlt,
            type: "text",
            refInput: nomeRef,
            disabled: false,
        },
        CPF: {
            value: '',
            icon: FaRegAddressCard,
            type: "text",
            refInput: cpfRef,
            disabled: false,
        },
        data_de_nascimento: {
            value: '',
            icon: FaRegCalendarAlt,  
            type: "date",
            refInput: dateNascRef, 
            disabled: false,
        },
        telefone: {
            value: '',
            icon: FaPhone,
            type: "text",
            refInput: telefoneRef,
            disabled: false,
        },
        cursos: {
            value: '',
            valuesSelect: cursoValueSelect,
            type: 'select',
            disabled: false,
            refSelect: cursoRef,
            icon: FaGraduationCap,
        },
    };



    
    async function loadList(filled: 'filled' | 'unfilled' | 'all') {
        const result = await adminCursoService.loadListCursos(filled);
        
        await valueSelect(result);
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
        loadList("filled");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function handleSubmit(e: FormEvent) {
        setLoading(true);
        e.preventDefault();

        if(choiceReg) {

            const aluno: ListAlunoProps = {
                nome: nomeRef.current?.value, 
                data_nascimento: dateNascRef.current?.value, 
                cpf: cpfRef.current?.value,
                telefone: telefoneRef.current?.value, 
                id_curso: cursoRef.current?.value,
            }
            
            if(!await adminUserService.registerAluno(aluno)) return setLoading(false);
            
                 
        } else {
            const professor: ListProfessorProps = {
                nome: nomeRef.current?.value, 
                data_nascimento: dateNascRef.current?.value, 
                cpf: cpfRef.current?.value,
                telefone: telefoneRef.current?.value, 
                id_curso: parseInt(cursoRef.current?.value ?? ''),
                diciplina: diciplinaRef.current?.value
            }

            if(!await adminUserService.registerProfessor(professor)) return setLoading(false);

        }

        setLoading(false);
    }

    async function handleClick(cad:boolean){
        setChoiceReg(cad);
        cad ? await loadList("filled") : await loadList("unfilled");
    }

    return (
        <LoadingWrapper loading={loading}>
            <>
                <HanddleButton onClick={handleClick} firstValue={'Aluno'} lastValue={'Professor'}/>
                    { 
                        choiceReg ? (
                            <>
                                <DatasForm datas={userForm} handleSubmit={handleSubmit} title="Registrar aluno"/>
                            </>
                            
                        ) : (
                            <>
                                <DatasForm datas={
                                    {
                                        ...userForm, 
                                        diciplina: {
                                            value: '',
                                            icon: IoExtensionPuzzle,
                                            type:'text',
                                            disabled: false,
                                            refInput:diciplinaRef,
                                        },
                                    }} 
                                    handleSubmit={handleSubmit} 
                                    title="Registrar professor"
                                />
                            </>
                        )
                    }
            </>
        </LoadingWrapper>
    );

}


/* 
  `curso` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_aluno`)
*/