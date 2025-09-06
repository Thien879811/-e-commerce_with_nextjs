'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Category } from '@/types';

export default function ProductFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    rating: searchParams.get('rating') || ''
  });
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    router.push(`/products?${params.toString()}`);
  };
  
  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      rating: ''
    });
    router.push('/products');
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Lọc sản phẩm</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Danh mục</label>
          <select 
            name="category" 
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Tất cả danh mục</option>
            {categories?.map(category => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Giá</label>
          <div className="flex space-x-2">
            <input 
              type="number" 
              name="minPrice" 
              placeholder="Từ" 
              value={filters.minPrice}
              onChange={handleFilterChange}
              className="w-1/2 p-2 border rounded-md"
            />
            <input 
              type="number" 
              name="maxPrice" 
              placeholder="Đến" 
              value={filters.maxPrice}
              onChange={handleFilterChange}
              className="w-1/2 p-2 border rounded-md"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-black">Đánh giá</label>
          <select 
            name="rating" 
            value={filters.rating}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          >
            <option className='text-black' value="">Tất cả đánh giá</option>
            <option className='text-black' value="4">4 sao trở lên</option>
            <option className='text-black' value="3">3 sao trở lên</option>
            <option className='text-black' value="2">2 sao trở lên</option>
            <option className='text-black' value="1">1 sao trở lên</option>
          </select>
        </div>
        
        <div className="pt-4 flex space-x-2">
          <button 
            onClick={applyFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors w-full"
          >
            Áp dụng
          </button>
          <button 
            onClick={resetFilters}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Đặt lại
          </button>
        </div>
      </div>
    </div>
  );
}