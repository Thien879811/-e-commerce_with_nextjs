import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Order } from '../../../types';

export const metadata: Metadata = {
  title: 'Đơn hàng của tôi | E-Commerce',
  description: 'Xem lịch sử đơn hàng và trạng thái đơn hàng',
};

export default async function OrdersPage() {
  // Kiểm tra xác thực người dùng
  const user = await fetch('/api/auth/me').then(res => {
    if (!res.ok) return null;
    return res.json();
  }).catch(() => null);
  
  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!user) {
    redirect('/login?redirect=/account/orders');
  }
  
  // Fetch đơn hàng của người dùng
  const orders = await fetch('/api/orders').then(res => res.json()).catch(() => []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/account" className="text-blue-600 hover:underline mr-2">
          &larr; Quay lại tài khoản
        </Link>
        <h1 className="text-3xl font-bold">Đơn hàng của tôi</h1>
      </div>
      
      {orders.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <h2 className="text-xl font-bold mb-2">Bạn chưa có đơn hàng nào</h2>
          <p className="text-gray-600 mb-6">Hãy khám phá các sản phẩm của chúng tôi và đặt hàng ngay!</p>
          <Link 
            href="/products" 
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors inline-block"
          >
            Mua sắm ngay
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mã đơn hàng
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ngày đặt
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tổng tiền
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order: Order) => (
                  <tr key={order._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{order._id.substring(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.totalPrice.toLocaleString()}đ
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Đã giao' ? 'bg-green-100 text-green-800' :
                        order.status === 'Đang giao' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'Đang xử lý' ? 'bg-yellow-100 text-yellow-800' :
                        order.status === 'Đã hủy' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link href={`/account/orders/${order._id}`} className="text-blue-600 hover:text-blue-900">
                        Chi tiết
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}