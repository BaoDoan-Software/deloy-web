"use client";

import { useEffect, useState } from "react";
import { Order } from "@/types";
import Link from "next/link";

function formatPrice(price: number) {
  return price.toLocaleString("vi-VN") + "đ";
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface CustomerSummary {
  name: string;
  phone: string;
  email: string;
  address: string;
  orderCount: number;
  totalSpent: number;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"orders" | "customers">("orders");

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, []);

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Aggregate customers by phone
  const customerMap = new Map<string, CustomerSummary>();
  for (const order of orders) {
    const key = order.customer.phone;
    const existing = customerMap.get(key);
    if (existing) {
      existing.orderCount++;
      existing.totalSpent += order.total;
    } else {
      customerMap.set(key, {
        name: order.customer.name,
        phone: order.customer.phone,
        email: order.customer.email,
        address: order.customer.address,
        orderCount: 1,
        totalSpent: order.total,
      });
    }
  }
  const customers = Array.from(customerMap.values());

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
        Đang tải dữ liệu...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Quản lý đơn hàng và khách hàng</p>
        </div>
        <Link
          href="/"
          className="text-sm text-rose-500 hover:text-rose-600 font-medium"
        >
          &larr; Về trang chủ
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Tổng đơn hàng</p>
          <p className="text-3xl font-bold text-gray-900">{orders.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Tổng doanh thu</p>
          <p className="text-3xl font-bold text-rose-500">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Tổng khách hàng</p>
          <p className="text-3xl font-bold text-gray-900">{customers.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("orders")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "orders"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Đơn hàng
        </button>
        <button
          onClick={() => setTab("customers")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab === "customers"
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
          }`}
        >
          Khách hàng
        </button>
      </div>

      {/* Orders Table */}
      {tab === "orders" && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          {orders.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Chưa có đơn hàng nào
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-600">Mã đơn</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Khách hàng</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">SĐT</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Địa chỉ</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Sản phẩm</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Tổng tiền</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Ngày đặt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-700">
                        {order.id}
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {order.customer.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{order.customer.phone}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                        {order.customer.address}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <div key={i} className="text-xs">
                              {item.productName} (x{item.quantity}, {item.size})
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-rose-500 text-right">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Customers Table */}
      {tab === "customers" && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
          {customers.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              Chưa có khách hàng nào
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-3 font-semibold text-gray-600">Tên khách hàng</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">SĐT</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Email</th>
                    <th className="px-4 py-3 font-semibold text-gray-600">Địa chỉ</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-center">Số đơn</th>
                    <th className="px-4 py-3 font-semibold text-gray-600 text-right">Tổng chi tiêu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {customers.map((customer) => (
                    <tr key={customer.phone} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {customer.name}
                      </td>
                      <td className="px-4 py-3 text-gray-600">{customer.phone}</td>
                      <td className="px-4 py-3 text-gray-600">{customer.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                        {customer.address}
                      </td>
                      <td className="px-4 py-3 text-center font-medium">
                        {customer.orderCount}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-rose-500">
                        {formatPrice(customer.totalSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
