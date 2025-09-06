'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Cart } from '@/types';

export default function OrderSummary({ cart }: { cart: Cart }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Tính tổng tiền
  const subtotal = cart.items.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  // Phí vận chuyển (ví dụ: miễn phí vận chuyển cho đơn hàng trên 500,000đ)
  const shippingFee = subtotal > 500000 ? 0 : 30000;
  
  // Tổng cộng
  const total = subtotal + shippingFee;
  
  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Thông tin đơn hàng sẽ được lấy từ form và giỏ hàng
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        router.push(`/account/orders/${data.orderId}?success=true`);
      } else {
        // Xử lý lỗi
        console.error('Đặt hàng thất bại');
      }
    } catch (error) {
      console.error('Lỗi khi đặt hàng:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
      <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
      
      <div className="max-h-60 overflow-y-auto mb-4">
        {cart.items.map((item) => (
          <div key={item.product._id} className="flex py-2 border-b">
            <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-md relative overflow-hidden">
              <img 
                src={item.product.images[0]} 
                alt={item.product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <span className="absolute top-0 right-0 bg-gray-800 text-white text-xs px-1 rounded-bl">
                {item.quantity}
              </span>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.product.name}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {(item.product.discountPrice || item.product.price).toLocaleString()}đ
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Tạm tính</span>
          <span className="font-medium">{subtotal.toLocaleString()}đ</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Phí vận chuyển</span>
          <span className="font-medium">
            {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString()}đ`}
          </span>
        </div>
        
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-bold">
            <span>Tổng cộng</span>
            <span className="text-xl">{total.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
      
      <button 
        onClick={handlePlaceOrder}
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white text-center py-3 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Đang xử lý...' : 'Đặt hàng'}
      </button>
    </div>
  );
}