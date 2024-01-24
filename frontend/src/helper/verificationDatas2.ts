import { ListAlunoProps } from "../props/alunoProps";
import { ListProfessorProps } from "../props/professorProps";

export async function verificationDatas(idRef?:string, nomeRef?:string, dataNasRef?:string, cpfRef?:string, telefoneRef?:string, cursoRef?:string, diciplinaRef?:string , isProfessor:boolean = false, isEdit:boolean = false): Promise<ListProfessorProps | ListAlunoProps | false>{ 
    
    // console.log(nomeRef, dataNasRef, cpfRef, telefoneRef, cursoRef, idRef);
    
    if((!nomeRef || !dataNasRef || !cpfRef || !telefoneRef || !cursoRef) ||
        (isProfessor && !diciplinaRef) ||
        (isEdit && !idRef))
        return false;
    else {
        const nome:string = nomeRef;
        const data_nascimento:string = dataNasRef.substring(0, 10);
        const cpf:string = cpfRef;
        const telefone:string = telefoneRef;
        const diciplina:string = diciplinaRef ?? "";
        const curso:number = parseInt(cursoRef);
        const id:number = parseInt(idRef ?? "");

        const resultDatas = {
            nome, 
            data_nascimento,
            cpf, 
            telefone,
            id_curso: curso
        }

        if(isProfessor) {
            const result: ListProfessorProps = {
                ...resultDatas,
                id_professor: isEdit ? id : undefined,
                diciplina
            }
             return result;
        } else {
            const result: ListAlunoProps = {
                id_aluno: isEdit ? id : undefined,
                ...resultDatas
            };
             return result ;    
        }
    }
}