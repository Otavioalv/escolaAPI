

interface atributesButton {
    actionString?: string;
    actionFunction?: () => void ;
    actionDeleteAluno?: (id: number, cpf: string) => void,
    actionDeleteProfessor?: (id: number, cpf: string) => void,
    actionDeleteCurso?: (id: number) => void;
    color?: 'red' | 'green' | 'yellow' | 'blue'
}

export interface DatasListButonsProps extends Record<string, atributesButton | undefined> {
    deleteAluno?: { 
        actionDeleteAluno: (id: number, cpf:string) => void,
        color: 'red'
    };
    deleteProfessor?: {
        actionDeleteProfessor: (id: number, cpf: string) => void,
        color: 'red'
    }
    deleteNota?: {
        actionDeleteCurso: (id: number) => void,
        color: 'red'
    }
}

export interface datasListProps  {
    user: Record<string, unknown >[];
    title?: string;
    buttons?: DatasListButonsProps;
    useImg?: boolean;
}