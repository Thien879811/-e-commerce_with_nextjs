
import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import StatisticCard from './components/StatisticCard';
import RecentOrdersTable from './components/RecentOrdersTable';
import SalesChart from './components/SalesChart';

export const metadata: Metadata = {
  title: 'Dashboard | Admin',
  description: 'Quản lý website thương mại điện tử',
};

export default async function AdminDashboard() {
  
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatisticCard 
            title="Tổng đơn hàng" 
            value={1} 
            icon="shopping-bag" 
            color="blue"
          />
          <StatisticCard 
            title="Tổng sản phẩm" 
            value={1} 
            icon="cube" 
            color="green"
          />
          <StatisticCard 
            title="Tổng người dùng" 
            value={1} 
            icon="users" 
            color="purple"
          />
          <StatisticCard 
            title="Doanh thu" 
            value={1} 
            icon="currency-dollar" 
            color="yellow"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Doanh thu theo thời gian</h2>
            <SalesChart />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Đơn hàng gần đây</h2>
              <Link href="/admin/orders" className="text-blue-600 hover:underline text-sm">
                Xem tất cả
              </Link>
            </div>
            {/* <RecentOrdersTable orders={recentOrders} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}