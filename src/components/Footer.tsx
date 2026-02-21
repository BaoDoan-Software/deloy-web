export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              FASHION<span className="text-rose-500">STORE</span>
            </h3>
            <p className="text-sm leading-relaxed">
              Cửa hàng thời trang trực tuyến với những sản phẩm chất lượng, phong cách hiện đại.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">Liên kết</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-rose-400 transition-colors">Trang chủ</a></li>
              <li><a href="/products" className="hover:text-rose-400 transition-colors">Sản phẩm</a></li>
              <li><a href="/checkout" className="hover:text-rose-400 transition-colors">Giỏ hàng</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white uppercase mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: contact@fashionstore.vn</li>
              <li>SĐT: 0123 456 789</li>
              <li>Địa chỉ: 123 Nguyễn Huệ, Q.1, TP.HCM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          &copy; 2026 FashionStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
