import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Tài khoản của tôi | E-Commerce',
  description: 'Quản lý thông tin tài khoản, đơn hàng và địa chỉ giao hàng',
};

export default async function AccountPage() {
  // Kiểm tra xác thực người dùng
  const user = await fetch('/api/auth/me').then(res => {
    if (!res.ok) return null;
    return res.json();
  }).catch(() => null);
  
  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!user) {
    redirect('/login?redirect=/account');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tài khoản của tôi</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            
            <nav className="space-y-1">
              <Link 
                href="/account" 
                className="block px-3 py-2 rounded-md bg-blue-50 text-blue-700 font-medium"
              >
                Tổng quan
              </Link>
              <Link 
                href="/account/orders" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Đơn hàng của tôi
              </Link>
              <Link 
                href="/account/addresses" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Địa chỉ giao hàng
              </Link>
              <Link 
                href="/account/settings" 
                className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cài đặt tài khoản
              </Link>
              <button 
                className="w-full text-left px-3 py-2 rounded-md text-red-600 hover:bg-red-50 mt-4"
              >
                Đăng xuất
              </button>
            </nav>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin tài khoản</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-600">Họ và tên</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Số điện thoại</p>
                <p className="font-medium">{user.phone || 'Chưa cập nhật'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Ngày tham gia</p>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
            
            <Link 
              href="/account/settings" 
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              Cập nhật thông tin
            </Link>
          </div>
          
          <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Đơn hàng gần đây</h2>
              <Link 
                href="/account/orders" 
                className="text-blue-600 hover:underline text-sm font-medium"
              >
                Xem tất cả
              </Link>
            </div>
            
            {/* Placeholder for recent orders */}
            <div className="border rounded-md p-4 text-center text-gray-500">
              Bạn chưa có đơn hàng nào.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}