import api from '@/lib/axios';

export const addProduct = async (formData: FormData) => {
    const response = await api.post(`admin/product/new`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}