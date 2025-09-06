import { Product } from '../../../types';
// import ProductCard from '../ProductCard/ProductCard';
// import { ProductCardProps } from '../ProductCard/ProductCard';

export function NewProducts({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return null;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8">Sản phẩm mới</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* {products.map(product => (
        //   <ProductCard key={product._id} product={product} />
        ))} */}
      </div>
    </div>
  );
}
