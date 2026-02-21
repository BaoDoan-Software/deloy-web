"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const categoryColors: Record<string, string> = {
  "Áo": "from-sky-400 to-blue-500",
  "Quần": "from-emerald-400 to-teal-500",
  "Giày": "from-amber-400 to-orange-500",
  "Phụ kiện": "from-purple-400 to-pink-500",
};

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === params.id);
  const [selectedSize, setSelectedSize] = useState("");
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Không tìm thấy sản phẩm
        </h1>
        <Link href="/products" className="text-rose-500 hover:underline">
          &larr; Quay lại danh sách
        </Link>
      </div>
    );
  }

  const gradient = categoryColors[product.category] || "from-gray-400 to-gray-500";

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addToCart(product, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-flex items-center gap-1"
      >
        &larr; Quay lại
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div
          className={`aspect-square bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center`}
        >
          <span className="text-8xl">
            {product.category === "Áo" && "👕"}
            {product.category === "Quần" && "👖"}
            {product.category === "Giày" && "👟"}
            {product.category === "Phụ kiện" && "👜"}
          </span>
        </div>

        {/* Product Info */}
        <div>
          <div className="bg-rose-50 text-rose-600 text-xs font-medium px-3 py-1 rounded-full inline-block mb-3">
            {product.category}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-bold text-rose-500 mb-6">
            {formatPrice(product.price)}
          </p>
          <p className="text-gray-600 leading-relaxed mb-8">
            {product.description}
          </p>

          {/* Size Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Chọn size
            </h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[48px] px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    selectedSize === size
                      ? "bg-gray-900 text-white border-gray-900"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
            {!selectedSize && (
              <p className="text-xs text-gray-400 mt-2">
                Vui lòng chọn size trước khi thêm vào giỏ
              </p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`w-full py-3.5 rounded-full font-semibold text-white transition-colors ${
              added
                ? "bg-green-500"
                : selectedSize
                ? "bg-rose-500 hover:bg-rose-600"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            {added ? "Đã thêm vào giỏ hàng!" : "Thêm vào giỏ hàng"}
          </button>

          <Link
            href="/checkout"
            className="block text-center mt-3 text-sm text-gray-500 hover:text-rose-500 transition-colors"
          >
            Xem giỏ hàng &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
