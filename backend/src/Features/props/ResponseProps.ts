export interface ResponseProps {
    success?: boolean;
    status?: number;
    message?: string;
}

export interface ResultListProps extends ResponseProps{
    rows?: object;
    StatusResponse?: ResponseProps;
}

export interface ResultLoginProps extends ResponseProps {
    token?: string, 
    StatusResponse?: ResponseProps;
}