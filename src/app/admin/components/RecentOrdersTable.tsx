import { Order } from '@/types';
import Link from 'next/link';

export default function RecentOrdersTable({ orders }: { orders: Order[] }) {
  if (!orders || orders.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        Chưa có đơn hàng nào.
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-blue-600 hover:underline">
                <Link href={`/admin/orders/${order._id}`}>
                  #{order._id.substring(0, 8)}
                </Link>
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {typeof order.user === 'object' ? order.user.name : 'N/A'}
              </td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                {order.totalPrice.toLocaleString()}đ
              </td>
              <td className="px-4 py-2 whitespace-nowrap">
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}