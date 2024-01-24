import { FormEvent } from "react";
import { IconType } from "react-icons";

export interface valueSelectAtributes extends Record<string, string>{
}

interface atributesFormDataProps {
    value: string | unknown,
    icon?: IconType,
    type: 'text' | 'date' | 'select' | 'password' | 'hidden' | 'number';
    disabled: boolean;
    id?: string;
    valuesSelect?: valueSelectAtributes;
    refInput?: React.MutableRefObject<HTMLInputElement | null>;
    refSelect?: React.MutableRefObject<HTMLSelectElement | null>;
}

export interface FormDatas extends Record<string, atributesFormDataProps> {
}

export interface FormDatasProps {
    datas: FormDatas, 
    title:string, 
    handleSubmit: (e: FormEvent) => void
}



