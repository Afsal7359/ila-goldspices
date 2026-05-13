"use client";
import { useEffect, useState } from "react";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/Sidebar";
import { api } from "@/lib/api";

const STATUSES = ["pending","confirmed","processing","shipped","delivered","cancelled"];
const STATUS_COLOR: Record<string, string> = {
  pending:    "bg-amber-100 text-amber-700",
  confirmed:  "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  shipped:    "bg-indigo-100 text-indigo-700",
  delivered:  "bg-green-100 text-green-700",
  cancelled:  "bg-red-100 text-red-700",
};

export default function AdminOrders() {
  const [orders, setOrders]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    const data = await api.getOrders();
    setOrders(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: string, status: string) {
    await api.updateOrderStatus(id, status);
    load();
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-forest-700">Orders</h2>
            <p className="text-sm text-gray-500 mt-1">{orders.length} total orders</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Customer","Items","Total","Status","Date",""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider first:px-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Loading…</td></tr>
                ) : orders.length === 0 ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">No orders yet</td></tr>
                ) : orders.map((order) => (
                  <>
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="font-medium text-forest-700">{order.customer_name}</p>
                        <p className="text-xs text-gray-400">{order.customer_phone}</p>
                        {order.customer_email && <p className="text-xs text-gray-400">{order.customer_email}</p>}
                      </td>
                      <td className="px-4 py-4 text-gray-600">
                        {Array.isArray(order.items) ? order.items.length : 1} item(s)
                      </td>
                      <td className="px-4 py-4 font-semibold">{order.currency} {order.total_amount}</td>
                      <td className="px-4 py-4">
                        <select value={order.status ?? "pending"}
                          onChange={(e) => updateStatus(order.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 font-medium cursor-pointer ${STATUS_COLOR[order.status ?? "pending"] ?? "bg-gray-100 text-gray-600"}`}>
                          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </td>
                      <td className="px-4 py-4 text-xs text-gray-400">
                        {order.created_at ? new Date(order.created_at).toLocaleDateString() : "—"}
                      </td>
                      <td className="px-4 py-4">
                        <button onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                          className="text-xs text-forest-600 hover:underline">
                          {expanded === order.id ? "Hide" : "Details"}
                        </button>
                      </td>
                    </tr>
                    {expanded === order.id && (
                      <tr key={`${order.id}-detail`} className="bg-gray-50">
                        <td colSpan={6} className="px-6 py-4">
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium mb-2 text-forest-700">Order Items</p>
                              {(Array.isArray(order.items) ? order.items : []).map((item: any, i: number) => (
                                <div key={i} className="flex justify-between py-1 border-b border-gray-100">
                                  <span>{item.product_name} ({item.pack_size}) × {item.quantity}</span>
                                  <span className="font-medium">{order.currency} {(item.unit_price * item.quantity).toFixed(2)}</span>
                                </div>
                              ))}
                            </div>
                            <div>
                              <p className="font-medium mb-2 text-forest-700">Delivery</p>
                              {order.customer_address && <p className="text-gray-600">Address: {order.customer_address}</p>}
                              {order.notes && <p className="text-gray-600 mt-1">Notes: {order.notes}</p>}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
