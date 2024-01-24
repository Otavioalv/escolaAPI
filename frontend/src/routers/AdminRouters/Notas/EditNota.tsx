import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListNotasProps } from "../../../props/notasProps";
import { saveTokenProps } from "../../../props/loginProps";
import { AdminAlunoService } from "../service/AdminAlunoService";
import DatasForm from "../../../components/DatasForm";
import { FormDatas } from "../../../props/formProps";
import { FaRegClipboard } from "react-icons/fa6";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";


export default function EditNota({token}: {token: saveTokenProps}) {

    const adminAlunoService: AdminAlunoService = new AdminAlunoService(token);

    const navigate = useNavigate();
    
    const {cpf_aluno} = useParams() as ListNotasProps;

    const [selectNota, setSelectNota] = useState<ListNotasProps | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const notaARef = useRef<HTMLInputElement | null>(null);
    const notaBRef = useRef<HTMLInputElement | null>(null);
    const notaCRef = useRef<HTMLInputElement | null>(null);
    const mediaRef = useRef<HTMLInputElement | null>(null);
    const situacaoRef = useRef<HTMLInputElement | null>(null);
    const idRef = useRef<HTMLInputElement | null>(null);

    const formDatas: FormDatas = {
        nota_A:  {
            value: selectNota?.notaA,
            icon: FaRegClipboard,
            disabled: false, 
            type: "number",
            refInput: notaARef
        },
        nota_B:  {
            value: selectNota?.notaB,
            icon: FaRegClipboard,
            disabled: false, 
            type: "number",
            refInput: notaBRef
        },
        nota_C:  {
            value: selectNota?.notaC,
            icon: FaRegClipboard,
            disabled: false, 
            type: "number",
            refInput: notaCRef
        },
        media: {
            value: selectNota?.media,
            icon: FaRegClipboard,
            disabled: false, 
            type: "number",
            refInput: mediaRef
        },
        situacao: {
            value: selectNota?.situacao,
            icon: FaRegClipboard,
            disabled: false, 
            type: "text",
            refInput: situacaoRef
        },
        id_nota: {
            value: selectNota?.id_notas,
            disabled: false, 
            type: "hidden",
            refInput: idRef
        }
    }

    async function loadList() {
        setLoading(true);
        const result = await adminAlunoService.listNota({cpf: cpf_aluno as string}) as ListNotasProps;

        setSelectNota(result);
        setLoading(false);
    }

    useEffect(() => {
        loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    async function handleSumbit(e: React.FormEvent) {
        setLoading(true);
        e.preventDefault();
        const id_notas:number = parseInt(idRef.current?.value ?? "");
        const media:number = parseInt(mediaRef.current?.value ?? "");
        const notaA: number = parseInt(notaARef.current?.value ?? "");
        const notaB:number = parseInt(notaBRef.current?.value ?? "");
        const notaC:number = parseInt(notaCRef.current?.value ?? "");
        const situacao:string = situacaoRef.current?.value ?? "";


        const notas:ListNotasProps = {
            id_notas,
            media,
            notaA, 
            notaB,
            notaC, 
            situacao,
            cpf_aluno
        }
        
        if(!await adminAlunoService.editNota(notas)) return setLoading(false);

        
        setLoading(false);
        navigate('/admin/alunos');
    }

    return (

        <LoadingWrapper loading={loading}>
            <DatasForm datas={formDatas} handleSubmit={handleSumbit} title="Editar nota"/>
        </LoadingWrapper>
    );
}