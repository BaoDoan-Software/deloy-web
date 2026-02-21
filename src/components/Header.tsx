"use client";

import Link from "next/link";
import CartIcon from "./CartIcon";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold tracking-tight text-gray-900">
            FASHION<span className="text-rose-500">STORE</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors"
            >
              Trang chủ
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors"
            >
              Sản phẩm
            </Link>
            <Link
              href="/dashboard"
              className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <CartIcon />
          </div>
        </div>
      </div>
    </header>
  );
}
