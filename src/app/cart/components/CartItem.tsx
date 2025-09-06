'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CartItem as CartItemType } from '../../../types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const [quantity, setQuantity] = useState(item.quantity);
  
  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > item.product.stock) return;
    
    setQuantity(newQuantity);
    
    try {
      await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item.product._id,
          quantity: newQuantity,
        }),
      });
      
      // Refresh the page to update cart totals
      window.location.reload();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };
  
  const removeItem = async () => {
    try {
      await fetch('/api/cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: item.product._id,
        }),
      });
      
      // Refresh the page to update cart
      window.location.reload();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };
  
  return (
    <div className="p-4">
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-6">
          <div className="flex items-center">
            <div className="relative h-20 w-20 flex-shrink-0">
              <Image 
                src={item.product.images[0]} 
                alt={item.product.name}
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-md"
              />
            </div>
            
            <div className="ml-4">
              <Link href={`/product/${item.product._id}`} className="font-medium hover:text-blue-600">
                {item.product.name}
              </Link>
              
              <button 
                onClick={removeItem}
                className="text-sm text-red-600 hover:underline block mt-1"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
        
        <div className="col-span-2 text-center">
          {item.product.discountPrice ? (
            <span className="font-medium">{item.product.discountPrice.toLocaleString()}đ</span>
          ) : (
            <span className="font-medium">{item.product.price.toLocaleString()}đ</span>
          )}
        </div>
        
        <div className="col-span-2 text-center">
          <div className="flex items-center justify-center">
            <button 
              onClick={() => updateQuantity(quantity - 1)}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-l-md hover:bg-gray-300"
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity}
              readOnly
              className="w-12 text-center border-y py-1"
            />
            <button 
              onClick={() => updateQuantity(quantity + 1)}
              className="bg-gray-200 text-gray-800 px-2 py-1 rounded-r-md hover:bg-gray-300"
              disabled={quantity >= item.product.stock}
            >
              +
            </button>
          </div>
        </div>
        
        <div className="col-span-2 text-center font-medium">
          {((item.product.discountPrice || item.product.price) * quantity).toLocaleString()}đ
        </div>
      </div>
    </div>
  );
}