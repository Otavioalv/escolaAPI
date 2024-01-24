export interface LoginProps {
    id?: string;
    cpf?: string;
    senha?: string;
    nome?: string;
    data_nascimento?: string;
    iat?: number,
    exp?: number
}

export interface LoginUserProps {
    id?: string;
    cpf?: string;
    token?:string;
}