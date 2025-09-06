import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import AccountSettingsForm from './components/AccountSettingsForm';
import ChangePasswordForm from './components/ChangePasswordForm';

export const metadata: Metadata = {
  title: 'Cài đặt tài khoản | E-Commerce',
  description: 'Cập nhật thông tin cá nhân và mật khẩu',
};

export default async function SettingsPage() {
  // Kiểm tra xác thực người dùng
  const user = await fetch('/api/auth/me').then(res => {
    if (!res.ok) return null;
    return res.json();
  }).catch(() => null);
  
  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!user) {
    redirect('/login?redirect=/account/settings');
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/account" className="text-blue-600 hover:underline mr-2">
          &larr; Quay lại tài khoản
        </Link>
        <h1 className="text-3xl font-bold">Cài đặt tài khoản</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
            <AccountSettingsForm user={user} />
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Đổi mật khẩu</h2>
            <ChangePasswordForm />
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Bảo mật tài khoản</h2>
            <p className="text-sm text-gray-600 mb-4">
              Để bảo vệ tài khoản của bạn, vui lòng không chia sẻ mật khẩu và đăng xuất khi sử dụng máy tính công cộng.
            </p>
            <div className="border-t pt-4 mt-4">
              <h3 className="text-md font-medium mb-2">Xóa tài khoản</h3>
              <p className="text-sm text-gray-600 mb-3">
                Khi xóa tài khoản, tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn và không thể khôi phục.
              </p>
              <button className="text-red-600 text-sm font-medium hover:underline">
                Xóa tài khoản của tôi
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}