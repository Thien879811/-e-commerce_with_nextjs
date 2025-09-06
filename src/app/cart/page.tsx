import { Metadata } from 'next';
import Link from 'next/link';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';

export const metadata: Metadata = {
  title: 'Giỏ hàng | E-Commerce',
  description: 'Giỏ hàng của bạn',
};

export default async function CartPage() {
  // Fetch dữ liệu giỏ hàng từ API
  const cart = await fetch('/api/cart').then(res => res.json());
  
  if (!cart || cart.items.length === 0) {
    return <EmptyCart />;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Giỏ hàng của bạn</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500">
                <div className="col-span-6">Sản phẩm</div>
                <div className="col-span-2 text-center">Giá</div>
                <div className="col-span-2 text-center">Số lượng</div>
                <div className="col-span-2 text-center">Tổng</div>
              </div>
            </div>
            
            <div className="divide-y">
              {cart.items.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
            
            <div className="p-4 flex justify-between">
              <Link 
                href="/products" 
                className="text-blue-600 hover:underline flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Tiếp tục mua sắm
              </Link>
              
              <button 
                className="text-red-600 hover:underline"
                // onClick={clearCartHandler}
              >
                Xóa giỏ hàng
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-1/3">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}