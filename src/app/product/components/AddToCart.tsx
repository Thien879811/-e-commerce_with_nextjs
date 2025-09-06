'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../../../types';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const addToCartHandler = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          quantity,
        }),
      });
      
      if (response.ok) {
        router.push('/cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  return (
    <div>
      {product.stock > 0 ? (
        <>
          <div className="flex items-center mb-4">
            <button 
              onClick={decreaseQuantity}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-l-md hover:bg-gray-300"
              disabled={quantity <= 1}
            >
              -
            </button>
            <input 
              type="number" 
              value={quantity}
              readOnly
              className="w-16 text-center border-y py-1"
            />
            <button 
              onClick={increaseQuantity}
              className="bg-gray-200 text-gray-800 px-3 py-1 rounded-r-md hover:bg-gray-300"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
          
          <button 
            onClick={addToCartHandler}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            Thêm vào giỏ hàng
          </button>
        </>
      ) : (
        <button 
          disabled
          className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-md cursor-not-allowed"
        >
          Hết hàng
        </button>
      )}
    </div>
  );
}