import axios from 'axios';
import { API_URL } from '@/config';
import api from '@/lib/axios';

export const addProduct = async (formData: FormData) => {
    const response = await api.post(`products`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}