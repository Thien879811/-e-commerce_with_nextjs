import Link from 'next/link';
import { Cart } from '../../../types';

interface CartSummaryProps {
  cart: Cart;
}

export default function CartSummary({ cart }: CartSummaryProps) {
  // Tính tổng tiền
  const subtotal = cart.items.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);
  
  // Phí vận chuyển (ví dụ: miễn phí vận chuyển cho đơn hàng trên 500,000đ)
  const shippingFee = subtotal > 500000 ? 0 : 30000;
  
  // Tổng cộng
  const total = subtotal + shippingFee;
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold mb-4">Tóm tắt đơn hàng</h2>
      
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
      
      <Link 
        href="/checkout" 
        className="block w-full bg-blue-600 text-white text-center py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Tiến hành thanh toán
      </Link>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>Chúng tôi chấp nhận các phương thức thanh toán sau:</p>
        <div className="flex space-x-2 mt-2">
          <div className="bg-gray-100 p-1 rounded">
            <span>Visa</span>
          </div>
          <div className="bg-gray-100 p-1 rounded">
            <span>MasterCard</span>
          </div>
          <div className="bg-gray-100 p-1 rounded">
            <span>PayPal</span>
          </div>
          <div className="bg-gray-100 p-1 rounded">
            <span>COD</span>
          </div>
        </div>
      </div>
    </div>
  );
}