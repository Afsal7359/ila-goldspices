"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/Sidebar";
import { api } from "@/lib/api";

export default function AdminDashboard() {
  const [stats, setStats]     = useState({ products: 0, orders: 0, wholesale: 0, contacts: 0 });
  const [orders, setOrders]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getStats(), api.getOrders()]).then(([s, o]) => {
      if (s) setStats(s);
      if (o) setOrders(o.slice(0, 5));
      setLoading(false);
    });
  }, []);

  const cards = [
    { label: "Products",   value: stats.products,  href: "/admin/products",  bg: "bg-forest-700" },
    { label: "Orders",     value: stats.orders,    href: "/admin/orders",    bg: "bg-gold-500"   },
    { label: "Wholesale",  value: stats.wholesale, href: "/admin/inquiries", bg: "bg-emerald-600"},
    { label: "Messages",   value: stats.contacts,  href: "/admin/inquiries", bg: "bg-slate-600"  },
  ];

  const statusColors: Record<string, string> = {
    pending:    "bg-amber-100 text-amber-700",
    confirmed:  "bg-blue-100 text-blue-700",
    processing: "bg-purple-100 text-purple-700",
    shipped:    "bg-indigo-100 text-indigo-700",
    delivered:  "bg-green-100 text-green-700",
    cancelled:  "bg-red-100 text-red-700",
  };

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-forest-700">Dashboard</h2>
            <p className="text-sm text-gray-500 mt-1">Welcome back</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {cards.map((c) => (
              <Link key={c.label} href={c.href}
                className={`${c.bg} text-white rounded-lg p-5 hover:opacity-90 transition-opacity`}>
                <p className="text-3xl font-bold">{loading ? "—" : c.value}</p>
                <p className="text-sm mt-1 opacity-80">{c.label}</p>
              </Link>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-sm">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="font-semibold text-forest-700">Recent Orders</h3>
              <Link href="/admin/orders" className="text-sm text-gold-600 hover:underline">View all →</Link>
            </div>
            {loading ? (
              <p className="px-6 py-10 text-center text-gray-400 text-sm">Loading…</p>
            ) : orders.length === 0 ? (
              <p className="px-6 py-10 text-center text-gray-400 text-sm">No orders yet. Orders placed via WhatsApp will appear here.</p>
            ) : (
              <div className="divide-y">
                {orders.map((order) => (
                  <div key={order.id} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm text-forest-700">{order.customer_name}</p>
                      <p className="text-xs text-gray-400">{order.customer_phone} · {order.created_at ? new Date(order.created_at).toLocaleDateString() : ''}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-sm">{order.currency} {order.total_amount}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
