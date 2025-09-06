import Link from 'next/link';
import Image from 'next/image';

export default function RelatedProducts({ products }) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link 
            key={product._id} 
            href={`/product/${product._id}`}
            className="group"
          >
            <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="relative h-48 w-full">
                <Image 
                  src={product.images[0]} 
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-2">
                  {product.discountPrice ? (
                    <div className="flex items-center">
                      <span className="font-bold text-red-600 mr-2">{product.discountPrice.toLocaleString()}đ</span>
                      <span className="text-sm text-gray-500 line-through">{product.price.toLocaleString()}đ</span>
                    </div>
                  ) : (
                    <span className="font-bold">{product.price.toLocaleString()}đ</span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}