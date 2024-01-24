import { FormEvent, useRef, useState } from "react";
import { ListLoginProps, saveTokenProps } from "../../../props/loginProps";
import DatasForm from "../../../components/DatasForm";
import { FormDatas } from "../../../props/formProps";
import { FaRegCalendarAlt, FaUserAlt } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import { AdminService } from "../service/AdminService";
import LoadingWrapper from "../../../components/layout/LoadingWrapper";


export default function AdminRegister({token}: {token: saveTokenProps}) {
    
    const adminService: AdminService = new AdminService(token);

    const [loading, setLoading] = useState<boolean>(false);

    const nomeRef = useRef<HTMLInputElement | null>(null);
    const dateNascRef = useRef<HTMLInputElement | null>(null);
    const cpfRef = useRef<HTMLInputElement | null>(null);
    const senhaRef = useRef<HTMLInputElement | null>(null);

    const datasForm: FormDatas = {
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
        senha: {
            value: '',
            type: "password",
            refInput: senhaRef, 
            disabled: false,
        }
    }

    
    async function handleSubmit(e: FormEvent) {
        setLoading(true);

        e.preventDefault();

        const admin: ListLoginProps = {
            cpf: cpfRef.current?.value ?? "", 
            senha: senhaRef.current?.value ?? "", 
            data_nascimento: dateNascRef.current?.value, 
            nome: nomeRef.current?.value ?? ""
        }

        await adminService.registerAdmin(admin);
        
        setLoading(false);
    }
    
    return (
        // <>  
        //     {loading ? (
        //         <Loading/>
        //     ) : (
        //         <DatasForm datas={datasForm} handleSubmit={handleSubmit} title="Registrar administrador"/>
        //     )}
        // </>
        <LoadingWrapper loading={loading}>
            <DatasForm datas={datasForm} handleSubmit={handleSubmit} title="Registrar administrador"/>
        </LoadingWrapper>
    );
}