import { useState } from 'react';
import { Product } from '../../../types';

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      
      <div className="flex items-center mb-4">
        <div className="flex text-yellow-500 mr-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < Math.floor(product.ratings) ? 'text-yellow-500' : 'text-gray-300'}>
              ★
            </span>
          ))}
        </div>
        <span className="text-gray-600">({product.numOfReviews} đánh giá)</span>
      </div>
      
      <div className="mb-4">
        {product.discountPrice ? (
          <div className="flex items-center">
            <span className="text-2xl font-bold text-red-600 mr-2">{product.discountPrice.toLocaleString()}đ</span>
            <span className="text-gray-500 line-through">{product.price.toLocaleString()}đ</span>
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
              {Math.round((1 - product.discountPrice / product.price) * 100)}% giảm
            </span>
          </div>
        ) : (
          <span className="text-2xl font-bold">{product.price.toLocaleString()}đ</span>
        )}
      </div>
      
      <div className="mb-4">
        <span className={`${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'} text-xs font-medium px-2.5 py-0.5 rounded`}>
          {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
        </span>
        {product.stock > 0 && (
          <span className="text-sm text-gray-500 ml-2">({product.stock} sản phẩm có sẵn)</span>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900">Danh mục:</h3>
        <p className="text-gray-600">{product.category.name}</p>
      </div>
      
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-900">Mô tả ngắn:</h3>
        <p className="text-gray-600">{product.description.substring(0, 200)}...</p>
      </div>
    </div>
  );
}