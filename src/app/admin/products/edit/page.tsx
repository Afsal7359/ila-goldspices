"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/Sidebar";
import ProductForm from "@/components/admin/ProductForm";
import { api, ApiProduct } from "@/lib/api";
import { Suspense } from "react";

function EditContent() {
  const params  = useSearchParams();
  const id      = params.get("id");
  const [product, setProduct] = useState<ApiProduct | null>(null);

  useEffect(() => {
    if (!id) return;
    api.getAllProducts().then((all) => {
      const found = (all ?? []).find((p) => p.id === id);
      if (found) setProduct(found);
    });
  }, [id]);

  return (
    <div className="mb-6">
      <Link href="/admin/products" className="text-sm text-gray-400 hover:text-forest-700">← Back to Products</Link>
      <h2 className="text-2xl font-semibold text-forest-700 mt-2">Edit Product</h2>
      <div className="mt-6">
        {product ? <ProductForm initial={product} /> : <p className="text-gray-400 text-sm">Loading product…</p>}
      </div>
    </div>
  );
}

export default function EditProductPage() {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 flex-1 p-8">
          <Suspense fallback={<p className="text-gray-400 text-sm p-8">Loading…</p>}>
            <EditContent />
          </Suspense>
        </main>
      </div>
    </AdminGuard>
  );
}
