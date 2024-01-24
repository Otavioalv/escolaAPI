import { ListResponseProps } from "../props/responseProps";

export async function setMessage({message = '', status = 0}: ListResponseProps) {
    const response: ListResponseProps = {
        message,
        status
    }
    localStorage.setItem('response_message', JSON.stringify(response));

    const functionCalledEvent:Event = new Event('functionCalled');
    window.dispatchEvent(functionCalledEvent);
}

export async function getMessage():Promise<ListResponseProps> {
    const stringMessage: string = localStorage.getItem('response_message') ?? '{}';
    
    return JSON.parse(stringMessage) as ListResponseProps;
}