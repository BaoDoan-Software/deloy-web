import Link from "next/link";
import { Product } from "@/types";

const categoryColors: Record<string, string> = {
  "Áo": "from-sky-400 to-blue-500",
  "Quần": "from-emerald-400 to-teal-500",
  "Giày": "from-amber-400 to-orange-500",
  "Phụ kiện": "from-purple-400 to-pink-500",
};

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductCard({ product }: { product: Product }) {
  const gradient = categoryColors[product.category] || "from-gray-400 to-gray-500";

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
        <div
          className={`aspect-[4/3] bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}
        >
          <span className="text-white/90 text-5xl font-light">
            {product.category === "Áo" && "👕"}
            {product.category === "Quần" && "👖"}
            {product.category === "Giày" && "👟"}
            {product.category === "Phụ kiện" && "👜"}
          </span>
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-medium px-2.5 py-1 rounded-full text-gray-700">
            {product.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 group-hover:text-rose-500 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-lg font-bold text-rose-500">{formatPrice(product.price)}</span>
            <span className="text-xs text-gray-400">
              {product.sizes.length} size
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
