export const auth = {
    secret: String(process.env.SECRET),
    expires: '2h'
};

export const databaseConfig: {
    HOST:string, 
    USER:string, 
    PASSWORD:string, 
    DATABASE:string, 
    PORT:number,
} = {
    HOST: String(process.env.HOST),
    USER: String(process.env.USER),
    PASSWORD: String(process.env.PASSWORD),
    DATABASE: String(process.env.DATABASE),
    PORT: parseInt(String(process.env.PORT)),
}