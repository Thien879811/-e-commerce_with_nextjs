import type { ReactNode } from "react";
import AdminSidebar from "./components/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}