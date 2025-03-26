import axios, { AxiosError } from "axios";
import { ApiError } from "src/models/Api";
import { handleGetAccessToken } from "./auth";



export const useApi = async <TypeDataResponse>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    data?: object,
    withAuth: boolean = true
) => {
    const BASE_URL = 'https://erp-backend-django-main.onrender.com';
    const access_token = handleGetAccessToken();

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (withAuth && access_token) {
        headers['Authorization'] = `Bearer ${access_token}`;
    }

    try {
        const response = await axios({
            url: `${BASE_URL}/api/v1/${endpoint}`,
            method,
            data,
            headers,
            withCredentials: true,  // Importante para CORS com credenciais
        });

        return {
            data: response.data,
            detail: '',
            status: response.status
        };
    } catch (e) {
        const error = e as AxiosError<ApiError>;
        console.error('API Error:', error);
        
        return {
            data: null,
            detail: error.response?.data?.detail || error.message || 'Unknown error',
            status: error.response?.status || 500
        };
    }
}