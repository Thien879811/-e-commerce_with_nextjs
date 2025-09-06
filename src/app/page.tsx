import { Metadata } from 'next';
import FeaturedProducts from './components/sections/FeaturedProducts';
import Banner from './components/sections/Banner';
import Categories from './components/sections/Categories';
import {NewProducts} from './components/sections/NewProducts';

export const metadata: Metadata = {
  title: 'Trang chủ | E-Commerce',
  description: 'Website thương mại điện tử',
};

export default async function Home() {
  // Fetch dữ liệu từ API
  const featuredProducts = await fetch('http://localhost:5000/api/v1/products').then(res => res.json());
  const categories = await fetch('http://localhost:5000/api/v1/categories').then(res => res.json());
  const newProducts = await fetch('http://localhost:5000/api/v1/products').then(res => res.json());
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <Banner />
      <Categories categories={categories.categories} />
      <FeaturedProducts products={featuredProducts.products} />
      <NewProducts products={newProducts.products} />
    </main>
  );
}
