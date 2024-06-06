export interface AxiosResponse<T> {
    status: 'success' | 'error';
    data:   T | null;
    error:  Error | null;
}

export interface Error {
    message: string | unknown,
    code: number
} 
