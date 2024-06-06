import axios, { AxiosError } from 'axios';
import { AxiosResponse } from '../models/Iaxios';
import { LocalStorageKeys } from '../utils/local-storage-keys';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

const getToken = (): string | null => {
    return localStorage.getItem(LocalStorageKeys.token);
}

const post = async<T>(route: string, data?: Record<string, unknown>) => {
    try {
        return await HttpRequest<T>('post', route, data);
    } catch (error) {
        return {
            status: "error",
            data: null,
            error: {
                message: (error as AxiosError).response?.data || (error as Error).message,
                code: 500
            }
        }
    }
}

const get = async<T>(route: string, queryParams?: Record<string, unknown>) => {
    try {
        const url = queryParams ? `${route}?${new URLSearchParams(JSON.stringify(queryParams))}` : route;
        return await HttpRequest<T>('get', url);
    } catch (error) {
        return {
            status: "error",
            data: null,
            error: {
                message: (error as AxiosError).response?.data || (error as Error).message,
                code: 500
            }
        }
    }
}

const put = async<T>(route: string, id: string, data?: Record<string, unknown>) => {
    try {
        const url = `${route}?id=${id}`;
        return await HttpRequest<T>('put', url, data);
    } catch (error) {
        return {
            status: "error",
            data: null,
            error: {
                message: (error as AxiosError).response?.data || (error as Error).message,
                code: 500
            }
        }
    }
};

const destroy = async<T>(route: string, id: string) => {
    try {
        const url = `${route}?id=${id}`;
        return await HttpRequest<T>('delete', url);
    } catch (error) {
        return {
            status: "error",
            data: null,
            error: {
                message: (error as AxiosError).response?.data || (error as Error).message,
                code: 500
            }
        }
    }
};


const HttpRequest = async<T>(method: HttpMethod, route: string, data?: Record<string, unknown>): Promise<AxiosResponse<T>> => {
    const token = getToken();
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const config = {
        method: method,
        maxBodyLength: Infinity,
        url: `http://localhost:3000/${route}`,
        headers,
        data: data,
    };

    try {
        const response = await axios.request<AxiosResponse<T>>(config)
        return response.data;
    } catch (error) {
        throw (error as AxiosError).response?.data || (error as Error).message;
    }
}

const http = {
    post,
    get,
    put,
    delete: destroy
}
export default http;