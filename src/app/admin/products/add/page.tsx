"use client";
import { addProduct } from '@/api/apiProduct';
import { useState } from 'react';
import { useCategories } from '@/hooks/useCategories';

export default function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const { data: categories, isLoading: isLoadingCategories, error } = useCategories();
    console.log(categories);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        try {
            setLoading(true);
            await addProduct(formData);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700">Product Name</label>
                                <input name='productName' type="text" className="mt-1 text-black block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-black text-sm font-semibold text-gray-700">Price</label>
                                <input name='price' type="number" className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-black text-sm font-semibold text-gray-700">Description</label>
                            <textarea name='description' rows={4} className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-black text-sm font-semibold text-gray-700">Image</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor='avatar' className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600">
                                                {previewImage ? (
                                                    <img src={previewImage} alt="preview" className="mt-2 rounded-md w-16 h-16" />
                                                ) : (
                                                    <div>
                                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                        </svg>
                                                        <span className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</span>
                                                    </div>
                                                )}
                                                <input name='avatar' id="avatar" type="file" className="sr-only" onChange={handleImageChange} />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-black text-sm font-semibold text-gray-700">Category</label>
                                <select name='category' className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                                    {categories?.map((c) => (
                                        <option key={c._id} value={c._id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-black text-sm font-semibold text-gray-700">Stock</label>
                                <input type="number" className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-black text-sm font-semibold text-gray-700">Discount (%)</label>
                                <input type="number" className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label className="block text-black text-sm font-semibold text-gray-700">Discount Price</label>
                                <input type="number" className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-black text-sm font-semibold text-gray-700">Discount End Date</label>
                            <input type="date" className="mt-1 block text-black w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out">
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}