"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiProduct } from "@/lib/api";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.getProducts().then((data) => {
      if (data) setProducts(data.slice(0, 6));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-cream-200/60 animate-pulse rounded" />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
        {products.map((product, i) => (
          <Reveal key={product.slug} delay={i * 80}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <Reveal className="text-center mt-20">
        <Link href="/products" className="btn-outline">
          View all products
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
            <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="square" />
          </svg>
        </Link>
      </Reveal>
    </>
  );
}
