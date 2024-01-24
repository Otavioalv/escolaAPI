export interface ProfessorProps {
    id_professor?: number | string;
    id_curso?: number | string;
    nome?: string;
    data_nascimento?: string;
    cpf?: string;
    telefone?: string;
    diciplina?: string;
    token?: string;
}

export interface DeleteProfessorProps {
    id: number;
    cpf?:string;
}