export default function ProductSort() {
  return (
    <div>
      <label htmlFor="sort" className="text-black " >Sắp xếp theo:</label>
      <select id="sort">
        <option className="text-black " value="newest">Mới nhất</option>
        <option className="text-black " value="price-asc">Giá tăng dần</option>
        <option className="text-black " value="price-desc">Giá giảm dần</option>
      </select>
    </div>
  );
}

export type ProductSortType = 'newest' | 'price-asc' | 'price-desc';

export const SORT_OPTIONS: ProductSortType[] = ['newest', 'price-asc', 'price-desc'];