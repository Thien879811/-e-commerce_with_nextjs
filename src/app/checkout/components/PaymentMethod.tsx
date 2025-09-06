'use client';

import { useState } from 'react';

export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-bold mb-4">Phương thức thanh toán</h2>
      
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            id="cod"
            name="paymentMethod"
            type="radio"
            value="cod"
            checked={paymentMethod === 'cod'}
            onChange={() => setPaymentMethod('cod')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="cod" className="ml-3 block text-sm font-medium text-gray-700">
            Thanh toán khi nhận hàng (COD)
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="bank-transfer"
            name="paymentMethod"
            type="radio"
            value="bank-transfer"
            checked={paymentMethod === 'bank-transfer'}
            onChange={() => setPaymentMethod('bank-transfer')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="bank-transfer" className="ml-3 block text-sm font-medium text-gray-700">
            Chuyển khoản ngân hàng
          </label>
        </div>
        
        {paymentMethod === 'bank-transfer' && (
          <div className="ml-7 mt-3 p-4 bg-gray-50 rounded-md text-sm">
            <p className="font-medium">Thông tin tài khoản:</p>
            <p>Ngân hàng: Vietcombank</p>
            <p>Số tài khoản: 1234567890</p>
            <p>Chủ tài khoản: CÔNG TY TNHH E-COMMERCE</p>
            <p className="mt-2 text-gray-600">Nội dung chuyển khoản: [Mã đơn hàng] - [Họ tên]</p>
          </div>
        )}
        
        <div className="flex items-center">
          <input
            id="momo"
            name="paymentMethod"
            type="radio"
            value="momo"
            checked={paymentMethod === 'momo'}
            onChange={() => setPaymentMethod('momo')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="momo" className="ml-3 block text-sm font-medium text-gray-700">
            Ví MoMo
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="vnpay"
            name="paymentMethod"
            type="radio"
            value="vnpay"
            checked={paymentMethod === 'vnpay'}
            onChange={() => setPaymentMethod('vnpay')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="vnpay" className="ml-3 block text-sm font-medium text-gray-700">
            VNPay
          </label>
        </div>
      </div>
    </div>
  );
}