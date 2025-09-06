import { Product } from "@/types";

export default function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div>
        <progress className="w-full h-2 bg-gray-200 rounded-full"></progress>
    </div>
  );
}