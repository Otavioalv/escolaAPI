import { ListResponseProps } from "../props/responseProps"


type statusKey = {
    readonly InvalidLogin: ListResponseProps,
    readonly InternalServerError: ListResponseProps,
    readonly BadRequest: ListResponseProps,
    readonly Delegated: ListResponseProps,
    readonly UserNotFound: ListResponseProps,
}

export const StatusCodes:statusKey = {
    Delegated: {status: 200, message: "Successfully delegated"},
    BadRequest: {status: 400, message: "The request has invalid syntax or missing parameters"},
    InvalidLogin:  {message: 'Invalid login', status: 400},
    InternalServerError: {message: "An internal server error occurred while processing the request", status: 500, },
    UserNotFound: {message: 'User not found', status: 404}
};