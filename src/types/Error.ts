export interface Error {
    data: {
        detail: string;
    };
    status: number;
    originalStatus: number;
}
