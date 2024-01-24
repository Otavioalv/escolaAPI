import { ProfessorProps } from "../props/ProfessorProps";

export async function datasValidationProfessor({id_professor, nome, data_nascimento, cpf, telefone, diciplina} : ProfessorProps):Promise<boolean>{

    if(!nome || !data_nascimento || !cpf || !telefone || !diciplina ) {
        return false;
    } else {

        const validationDate:boolean = await date(data_nascimento);
        const validationCpf:boolean = await numebers(cpf);
        const validationTelefone:boolean = await numebers(telefone);

        if(!validationCpf || !validationDate || !validationTelefone) return false;

        return true;

    }
}


async function date(data_nascimento: string):Promise<boolean> {
    
    const dateNow = new Date();
    const newDateStr:string = data_nascimento.toString().substring(0, 10);
    const newDate: Date = new Date(newDateStr);

    if(newDate.getFullYear() > dateNow.getFullYear())
        return false;

    return true;
}


async function numebers(number: string):Promise<boolean> {
    
    const veriNumber:boolean = await isNumber(number);

    if(number.length !== 11 || !veriNumber)
        return false; 

    return true;
}

async function isNumber(n:string):Promise<boolean> {
    return /^\d+$/.test(n);
}