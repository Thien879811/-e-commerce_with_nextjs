import axios from 'axios';
import { API_URL } from '@/config';

export const addProduct = async (formData: FormData) => {
    const response = await axios.post(`${API_URL}/api/products`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}