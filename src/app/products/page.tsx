import { Metadata } from 'next';
import ProductFilter from './components/ProductFilter';
import ProductSort from './components/ProductSort';
import ProductGrid from './components/ProductGrid';

export const metadata: Metadata = {
  title: 'Sản phẩm | E-Commerce',
  description: 'Danh sách sản phẩm',
};

export default async function ProductsPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Xử lý tham số tìm kiếm, lọc, phân trang
  const page = searchParams.page || 1;
  const limit = searchParams.limit || 12;
  const category = searchParams.category || '';
  const minPrice = searchParams.minPrice || 0;
  const maxPrice = searchParams.maxPrice || 1000000;
  const sort = searchParams.sort || 'newest';
  
  // Fetch dữ liệu từ API
  const products = await fetch(
    `http://localhost:5000/api/v1/products?page=${page}&limit=${limit}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}`
  ).then(res => res.json());
  
  const categories = await fetch('http://localhost:5000/api/v1/categories').then(res => res.json());

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sản phẩm</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/4">
          <ProductFilter categories={categories.categories} />
        </div>
        
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p>Hiển thị {products.length} sản phẩm</p>
            <ProductSort />
          </div>
          
          <ProductGrid items={products.products} />
          
          {/* Phân trang */}
          <div className="mt-8 flex justify-center">
            {/* Component phân trang */}
          </div>
        </div>
      </div>
    </div>
  );
}