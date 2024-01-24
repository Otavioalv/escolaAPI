import { ResponseProps } from "../props/ResponseProps";

type statusKey =  {
    readonly Success: ResponseProps,
    readonly Created: ResponseProps,
    
    readonly BadRequest: ResponseProps,
    readonly Unauthorized: ResponseProps,
    readonly Forbidden: ResponseProps,
    readonly NotFound: ResponseProps,
    
    readonly InternalServerError: ResponseProps,

    readonly IncorrectPassword: ResponseProps,
    readonly IncorrectCPF: ResponseProps,
    readonly UserNotFound: ResponseProps, 
}

export const StatusCodes = {
    Success: { status: 200, message: "The request was successful" },
    Created: {status: 201, message: "New feature has been created successfully"},

    BadRequest: {status: 400, message: "The request has invalid syntax or missing parameters"},
    Unauthorized: {status: 401, message: "The request requires client authentication"},
    Forbidden: {status: 403, message: "The client does not have permission to access the requested resource"},
    NotFound: {status: 404, message: "The requested resource was not found" },
    
    InternalServerError: {status: 500, message: "An internal server error occurred while processing the request"},

    IncorrectPassword: {status: 400, message: "The password is incorrect"},
    IncorrectCPF: {status: 400, message: "The CPF is incorrect"},
    UserNotFound: {status: 400, message: "User was not found or is not registered in the system"},

} as statusKey;