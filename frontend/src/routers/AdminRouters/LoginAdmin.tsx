import { FormEvent, useRef, useState } from "react";
import { ListLoginProps} from "../../props/loginProps";
import { useNavigate } from "react-router-dom";
import { AdminService } from "./service/AdminService";
import { FormDatas } from "../../props/formProps";
import { FaRegAddressCard, FaRegEye } from "react-icons/fa";
import DatasForm from "../../components/DatasForm";
import LoadingWrapper from "../../components/layout/LoadingWrapper";

export default function LoginAdmin() {

    const adminService:AdminService = new AdminService();

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
            senha: senhaRef.current?.value ?? "",
        }

        if(!await adminService.LoginAdmin(datas)) return setLoading(false);
        
        navigate('/admin');
    }
    
    return (
        <LoadingWrapper loading={loading}>
            <DatasForm datas={formDatas} handleSubmit={handleSubmit} title="Login admin"/>
        </LoadingWrapper>
    )
}