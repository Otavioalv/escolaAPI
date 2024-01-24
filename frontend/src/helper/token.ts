import { saveTokenProps } from "../props/loginProps";
import { setMessage } from "./messagePage";
import { StatusCodes } from "./statusResult";

export  async function saveToken(tokenObj:saveTokenProps) {
    localStorage.setItem('token', JSON.stringify(tokenObj));
}

export function getToken():saveTokenProps {
    
    const tokenStr:string = localStorage.getItem('token') ?? "{}";
    const tokenObj:saveTokenProps = JSON.parse(tokenStr);
    
    return tokenObj;
}

export async function deleteToken() {
    try {
        localStorage.removeItem('token');  
        setMessage(StatusCodes.Delegated)
    } catch (err) {
        throw new Error(`Erro ao realizar logout >>> ${err}`);
    }
}