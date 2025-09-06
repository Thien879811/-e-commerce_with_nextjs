import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedProducts({ products }) {
  return (
    <section className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Sản phẩm nổi bật</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link href={`/product/${product._id}`}>
                <div className="relative h-64 w-full">
                  <Image 
                    src={product.images[0]} 
                    alt={product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      {product.discountPrice ? (
                        <>
                          <span className="text-red-600 font-bold">{product.discountPrice.toLocaleString()}đ</span>
                          <span className="text-gray-400 line-through text-sm ml-2">{product.price.toLocaleString()}đ</span>
                        </>
                      ) : (
                        <span className="font-bold">{product.price.toLocaleString()}đ</span>
                      )}
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{product.ratings}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Xem tất cả sản phẩm
          </Link>
        </div>
      </div>
    </section>
  );
}