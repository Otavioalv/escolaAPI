import { FormEvent } from "react";

export interface ListLoginProps {
    cpf: string;
    senha: string;
    nome?: string;
    data_nascimento?: string;
}

export interface saveTokenProps {
    token: string;
}

export interface ComponenstLoginAtributes {
    placeholder: string;
    ref: React.MutableRefObject<HTMLInputElement | null>;
}

export interface ComponentsLogin {
    cpf: ComponenstLoginAtributes;
    senha: ComponenstLoginAtributes;
}

export interface LoginComponentProps {
    onSubmit: (e: FormEvent) => void;
    title: string;
    componentsLogin: ComponentsLogin;
}