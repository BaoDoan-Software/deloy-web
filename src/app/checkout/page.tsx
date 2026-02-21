"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

export default function CheckoutPage() {
  const { items, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: form,
          items: items.map((item) => ({
            productId: item.product.id,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            size: item.size,
          })),
          total: totalPrice,
        }),
      });
      const order = await res.json();
      setOrderId(order.id);
      setSuccess(true);
      clearCart();
    } catch {
      alert("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-green-50 rounded-2xl p-8">
          <div className="text-5xl mb-4">&#10003;</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Đặt hàng thành công!
          </h1>
          <p className="text-gray-600 mb-2">
            Mã đơn hàng: <span className="font-mono font-bold">{orderId}</span>
          </p>
          <p className="text-gray-500 text-sm mb-6">
            Chúng tôi sẽ liên hệ xác nhận đơn hàng của bạn sớm nhất.
          </p>
          <Link
            href="/products"
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Tiếp tục mua sắm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Giỏ hàng & Thanh toán</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-4">Giỏ hàng của bạn đang trống</p>
          <Link
            href="/products"
            className="inline-block bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-full transition-colors"
          >
            Xem sản phẩm
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-3 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Sản phẩm ({items.length})
            </h2>
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex items-center gap-4 bg-white rounded-xl p-4 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center text-2xl shrink-0">
                  {item.product.category === "Áo" && "👕"}
                  {item.product.category === "Quần" && "👖"}
                  {item.product.category === "Giày" && "👟"}
                  {item.product.category === "Phụ kiện" && "👜"}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {item.product.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} &middot; {formatPrice(item.product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity - 1)
                    }
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-medium">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product.id, item.size, item.quantity + 1)
                    }
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <p className="font-semibold text-gray-900 w-24 text-right">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
                <button
                  onClick={() => removeFromCart(item.product.id, item.size)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-lg font-semibold text-gray-900">Tổng cộng:</span>
              <span className="text-2xl font-bold text-rose-500">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 border border-gray-100 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Thông tin đặt hàng
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số điện thoại *
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="0912 345 678"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Địa chỉ giao hàng *
                  </label>
                  <textarea
                    required
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
                    placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-rose-500 hover:bg-rose-600 disabled:bg-gray-300 text-white font-semibold py-3 rounded-full transition-colors"
                >
                  {submitting ? "Đang xử lý..." : "Đặt hàng"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
