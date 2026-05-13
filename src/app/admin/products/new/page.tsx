"use client";
import Link from "next/link";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/Sidebar";
import ProductForm from "@/components/admin/ProductForm";

export default function NewProductPage() {
  return (
    <AdminGuard>
      <div className="flex min-h-screen bg-gray-50">
        <AdminSidebar />
        <main className="ml-60 flex-1 p-8">
          <div className="mb-6">
            <Link href="/admin/products" className="text-sm text-gray-400 hover:text-forest-700">← Back to Products</Link>
            <h2 className="text-2xl font-semibold text-forest-700 mt-2">New Product</h2>
          </div>
          <ProductForm isNew />
        </main>
      </div>
    </AdminGuard>
  );
}
