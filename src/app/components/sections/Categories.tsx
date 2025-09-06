import Link from 'next/link';
import Image from 'next/image';

export default function Categories({ categories }) {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Danh mục phổ biến</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category._id} 
              href={`/products?category=${category._id}`}
              className="bg-white rounded-lg shadow-sm p-4 text-center hover:shadow-md transition-shadow"
            >
              <div className="relative h-24 w-24 mx-auto mb-4">
                <Image 
                  src={category.image || '/placeholder.png'} 
                  alt={category.name}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="font-medium">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}