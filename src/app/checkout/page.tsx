import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import ShippingForm from './components/ShippingForm';
import PaymentMethod from './components/PaymentMethod';
import OrderSummary from './components/OrderSummary';

export const metadata: Metadata = {
  title: 'Thanh toán | E-Commerce',
  description: 'Hoàn tất đơn hàng của bạn',
};

export default async function CheckoutPage() {
  // Fetch dữ liệu giỏ hàng từ API
  const cart = await fetch('/api/cart').then(res => res.json());
  
  // Nếu giỏ hàng trống, chuyển hướng về trang giỏ hàng
  if (!cart || cart.items.length === 0) {
    redirect('/cart');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Thanh toán</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 space-y-6">
          <ShippingForm />
          <PaymentMethod />
        </div>
        
        <div className="w-full lg:w-1/3">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}