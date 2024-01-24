export interface ListProfessorProps {
    id_professor?: number;
    id_curso?: number;
    nome?: string;
    data_nascimento?: string;
    cpf?: string;
    telefone?: string;
    diciplina?: string;
    nomeCurso?: string;
}

export interface RegisterProfessorProps {
    id_professor?: number;
    id_curso_rp?: number;
    cpf_professor_rp?: string;
}