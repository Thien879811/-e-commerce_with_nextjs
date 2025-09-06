import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
  return (
    <section className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Khám phá sản phẩm chất lượng cao</h1>
          <p className="text-xl mb-6">Giảm giá lên đến 50% cho người dùng mới</p>
          <Link href="/products" className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors inline-block">
            Mua ngay
          </Link>
        </div>
        
        <div className="md:w-1/2 relative h-64 md:h-96 w-full">
          <Image 
            src="/banner-image.jpg" 
            alt="Banner promotion"
            fill
            style={{ objectFit: 'cover' }}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
}