"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CategoryModal from "@/app/admin/components/CateloryModal";

interface Product {
  _id: string;
  name: string;
  price: number;
}

export default function AdminProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);


  return (
    <div className="p-6">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold mb-4">Sản phẩm</h1>
            <Link href="/admin/products/add" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Thêm mới
            </Link>
        </div>
      <table className="w-full border-collapse border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Price</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  );
}
