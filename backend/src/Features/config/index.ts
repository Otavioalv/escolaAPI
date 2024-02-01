export const auth = {
    secret: String(process.env.SECRET),
    expires: '2h'
};

interface databaseConfigInterface{
    HOST:string, 
    USER:string, 
    PASSWORD:string, 
    DATABASE:string, 
    PORT:number,
};

export const databaseConfig: databaseConfigInterface = {
    HOST: String(process.env.HOST),
    USER: String(process.env.USER),
    PASSWORD: String(process.env.PASSWORD),
    DATABASE: String(process.env.DATABASE),
    PORT: parseInt(String(process.env.PORT)),
}