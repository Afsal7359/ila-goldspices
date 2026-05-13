"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/Sidebar";
import { api, ApiProduct } from "@/lib/api";

export default function AdminProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading]   = useState(true);

  async function load() {
    const data = await api.getAllProducts();
    setProducts(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function toggleActive(p: ApiProduct) {
    await api.upsertProduct({ ...p, active: !p.active });
    load();
  }

  async function deleteProduct(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await api.deleteProduct(id);
    load();
  }

  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 flex-1 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-forest-700">Products</h2>
              <p className="text-sm text-gray-500 mt-1">{products.length} products in Firestore</p>
            </div>
            <Link href="/admin/products/new"
              className="bg-forest-700 text-white px-4 py-2 rounded text-sm font-medium hover:bg-forest-800 transition-colors">
              + Add Product
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {["Product","Category","Retail Price","Wholesale","Status",""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider first:px-6">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {loading ? (
                  <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Loading…</td></tr>
                ) : products.map((p) => (
                  <tr key={p.id ?? p.slug} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-forest-700">{p.name}</div>
                      <div className="text-xs text-gray-400">{p.slug}</div>
                    </td>
                    <td className="px-4 py-4 text-gray-600">{p.category}</td>
                    <td className="px-4 py-4 font-medium">{p.currency} {p.retail_price ?? "—"}</td>
                    <td className="px-4 py-4 text-gray-600">{p.currency} {p.wholesale_price ?? "—"}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => toggleActive(p)}
                        className={`text-xs px-2 py-1 rounded-full mr-1 ${String(p.active) !== 'false' && String(p.active) !== 'FALSE' ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                        {String(p.active) !== 'false' && String(p.active) !== 'FALSE' ? "Active" : "Hidden"}
                      </button>
                      {(p.coming_soon === true || String(p.coming_soon) === 'true' || String(p.coming_soon) === 'TRUE') && (
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">Coming Soon</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex gap-3 justify-end">
                        <Link href={`/admin/products/edit?id=${p.id}`} className="text-forest-600 hover:underline text-xs">Edit</Link>
                        <button onClick={() => deleteProduct(p.id)} className="text-red-400 hover:text-red-600 text-xs">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </AdminGuard>
  );
}
