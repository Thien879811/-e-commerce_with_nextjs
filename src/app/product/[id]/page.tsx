import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProductGallery from '../components/ProductGallery';
import ProductInfo from '../components/ProductInfo';
import AddToCart from '../components/AddToCart';
import RelatedProducts from '../components/RelatedProducts';

export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await fetch(`/api/products/${params.id}`).then(res => res.json());
  
  return {
    title: `${product.name} | E-Commerce`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductDetail({ params }) {
  // Fetch dữ liệu sản phẩm từ API
  const product = await fetch(`/api/products/${params.id}`).then(res => res.json());
  
  // Fetch sản phẩm liên quan
  const relatedProducts = await fetch(`/api/products/related/${params.id}`).then(res => res.json());
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-4">
        <Link href="/products" className="text-blue-600 hover:underline">
          &larr; Quay lại danh sách sản phẩm
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Gallery hình ảnh sản phẩm */}
        <div className="w-full md:w-1/2">
          <ProductGallery images={product.images} name={product.name} />
        </div>
        
        {/* Thông tin sản phẩm */}
        <div className="w-full md:w-1/2">
          <ProductInfo product={product} />
          <AddToCart product={product} />
        </div>
      </div>
      
      {/* Mô tả chi tiết */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Mô tả sản phẩm</h2>
        <div className="prose max-w-none">
          {product.description}
        </div>
      </div>
      
      {/* Đánh giá và bình luận */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Đánh giá ({product.numOfReviews})</h2>
        
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review._id} className="border-b pb-4">
                <div className="flex items-center mb-2">
                  <div className="font-semibold">{review.name}</div>
                  <div className="ml-4 flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
        )}
      </div>
      
      {/* Sản phẩm liên quan */}
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}