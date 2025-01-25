export interface IError {
    data: {
        detail: string;
    };
    status: number;
    originalStatus: number;
}

export interface ICalculateError {
    data: string;
    status: number;
    originalStatus: number;
}
