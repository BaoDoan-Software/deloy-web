import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-rose-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <p className="text-rose-300 font-medium mb-4 tracking-wide uppercase text-sm">
              Bộ sưu tập mới 2026
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Phong Cách
              <br />
              <span className="text-rose-400">Định Nghĩa Bạn</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Khám phá bộ sưu tập thời trang mới nhất với chất liệu cao cấp,
              thiết kế hiện đại phù hợp mọi phong cách sống.
            </p>
            <Link
              href="/products"
              className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-8 py-3.5 rounded-full transition-colors"
            >
              Mua sắm ngay
            </Link>
          </div>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djJoLTJ2LTJoMnptMC00aDJ2Mmgt MnYtMnptLTQgMHYyaC0ydi0yaDJ6bTIgMGgydjJoLTJ2LTJ6bS02IDBoMnYyaC0ydi0yem0yLTRoMnYyaC0ydi0yem00IDBoMnYyaC0ydi0yem00IDBoMnYyaC0ydi0yeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Sản phẩm nổi bật</h2>
            <p className="text-gray-500 mt-1">Những sản phẩm được yêu thích nhất</p>
          </div>
          <Link
            href="/products"
            className="text-sm font-medium text-rose-500 hover:text-rose-600 transition-colors"
          >
            Xem tất cả &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Danh mục sản phẩm
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Áo", icon: "👕", gradient: "from-sky-400 to-blue-500" },
              { name: "Quần", icon: "👖", gradient: "from-emerald-400 to-teal-500" },
              { name: "Giày", icon: "👟", gradient: "from-amber-400 to-orange-500" },
              { name: "Phụ kiện", icon: "👜", gradient: "from-purple-400 to-pink-500" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`bg-gradient-to-br ${cat.gradient} rounded-2xl p-8 text-center text-white hover:scale-105 transition-transform`}
              >
                <span className="text-4xl block mb-3">{cat.icon}</span>
                <span className="font-semibold text-lg">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
