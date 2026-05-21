"use client";
import { useEffect, useState } from "react";
import { api, ApiProduct } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export default function ProductsPage() {
  const [products, setProducts] = useState<ApiProduct[]>([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.getProducts().then((data) => {
      if (data) setProducts(data);
      setLoading(false);
    });
  }, []);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  if (loading) {
    return (
      <>
        <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-hero-gradient grain overflow-hidden">
          <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
          <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="h-4 w-32 bg-gold-200/60 rounded animate-pulse mb-5" />
            <div className="h-24 w-80 bg-forest-200/40 rounded animate-pulse" />
          </div>
        </section>
        <section className="py-20 lg:py-28 bg-cream-100">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-cream-200/60 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5 animate-fade-up">Our full range</div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-8xl text-forest-700 leading-[0.98] animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              Spices, nuts
              <br /><span className="font-sans not-italic font-semibold">&</span> dates.
            </h1>
            <p
              className="mt-8 text-xl text-forest-700/80 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              A growing range under the Ila Gold Spices brand. Core strength:
              Kerala-origin cardamom and pepper, complemented by carefully
              selected cashews, mixed nuts and dates.
            </p>
          </div>
        </div>
      </section>

      {/* Products grid grouped by category */}
      <section className="py-20 lg:py-28 bg-cream-100 grain">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-24">
          {categories.map((cat) => {
            const items = products.filter((p) => p.category === cat);
            return (
              <div key={cat}>
                <Reveal className="flex items-end justify-between mb-10 border-b border-gold-500/30 pb-6">
                  <div>
                    <div className="eyebrow text-gold-700 mb-2">{cat}</div>
                    <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight">
                      {cat === "Cardamom" && "Kerala's green gold"}
                      {cat === "Pepper"   && "The king of spices"}
                      {cat === "Nuts"     && "Selected kernels"}
                      {cat === "Dates"    && "Naturally sweet"}
                    </h2>
                  </div>
                  <div className="hidden md:block text-forest-700/50 text-sm">
                    {items.length} {items.length === 1 ? "product" : "products"}
                  </div>
                </Reveal>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12">
                  {items.map((product, i) => (
                    <Reveal key={product.slug} delay={i * 80}>
                      <ProductCard product={product} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
