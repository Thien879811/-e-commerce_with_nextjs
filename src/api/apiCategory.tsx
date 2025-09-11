import { Category } from '@/types';
import axios from 'axios';
import { API_URL } from '@/config';
import api from '@/lib/axios';

export const getCategories = async () => {
    const { data } = await axios.get<Category[]>(`categories`);
    return data;
}

export const createCategory = async (category: FormData) => {
    console.log(API_URL)
    const response = await api.post(`admin/category/new`, category,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
}

export const getAllCategories = async () => {
    const {data} = await api.get(`categories`);   
    const categories: Category[] = []
    if(data && data.success){
        categories.push(...data.categories);
    }
    return  categories;
}

export const updateCategory = async (id: string , category: FormData) => {
    console.log(category.get('_id'))
    const response = await api.put(`admin/category/${id}`, category,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    return response.data;
}

