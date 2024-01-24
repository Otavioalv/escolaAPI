import { LoginUserProps } from "../props/LoginProps";

import { auth } from "../config";
import { verify } from "jsonwebtoken";

export async function verifyTokenCpf(token: string, cpf: string) {
    const decodedToken = verify(token, auth.secret) as LoginUserProps; 
    return decodedToken.cpf === cpf;
}

export async function convertToken(token: string):Promise<any> {
    const decodedToken = verify(token, auth.secret);
    return decodedToken;
}
