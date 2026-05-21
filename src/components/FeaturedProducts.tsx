"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiProduct } from "@/lib/api";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProducts().then((data) => {
      if (data) setProducts(data.filter((p) => p.active !== false));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="bg-cream-100 animate-pulse">
            <div className="aspect-square bg-cream-200" />
            <div className="p-4 space-y-2">
              <div className="h-4 bg-cream-200 rounded w-3/4" />
              <div className="h-3 bg-cream-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((product) => {
          const img = product.product_image || product.window_image || "/images/product-cardamom-hero.jpeg";
          return (
            <Link
              key={product.slug}
              href={`/products/${product.slug}`}
              className="group bg-white border border-cream-200 hover:border-gold-400 hover:shadow-md transition-all"
            >
              <div className="aspect-square bg-cream-100 flex items-center justify-center p-4 overflow-hidden">
                <img
                  src={img}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="font-display font-semibold text-forest-700 text-base leading-snug mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-forest-700/50 mb-3">Export Grade Quality</p>
                <span className="inline-flex items-center gap-1.5 text-xs text-forest-700 font-semibold group-hover:text-gold-700 transition-colors">
                  View Product
                  <svg width="12" height="9" viewBox="0 0 14 10" fill="none" aria-hidden>
                    <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>

    </>
  );
}
