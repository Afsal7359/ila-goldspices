"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api, ApiProduct } from "@/lib/api";
import Reveal from "@/components/Reveal";
import { Flourish } from "@/components/Ornaments";
import ProductOrderButton from "@/components/ProductOrderButton";

export default function ProductPage() {
  const { slug }  = useParams<{ slug: string }>();
  const router    = useRouter();
  const [product, setProduct] = useState<ApiProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.getProduct(slug).then((data) => {
      if (!data) router.replace("/products");
      else setProduct(data);
      setLoading(false);
    });
  }, [slug, router]);

  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-hero-gradient">
        <div className="w-8 h-8 border-2 border-forest-700 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const displayImage = product.product_image || product.window_image;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="mb-10 animate-fade-up">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-forest-700/70 hover:text-forest-700 transition-colors"
            >
              <span>←</span> Back to products
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-4 animate-fade-up">
                <span className="eyebrow text-gold-700">{product.category}</span>
                {product.coming_soon && (
                  <span className="text-[0.65rem] tracking-[0.25em] uppercase bg-forest-700 text-gold-200 px-3 py-1">
                    Coming soon
                  </span>
                )}
              </div>

              <h1
                className="font-display text-4xl sm:text-5xl lg:text-7xl text-forest-700 leading-[1.0] animate-fade-up"
                style={{ animationDelay: "150ms" }}
              >
                {product.name}
              </h1>

              <p
                className="mt-4 text-2xl italic font-display text-gold-700 animate-fade-up"
                style={{ animationDelay: "250ms" }}
                dir="rtl"
                lang="ar"
              >
                {product.arabic_name}
              </p>

              <p
                className="mt-8 text-xl text-forest-700/80 leading-relaxed max-w-xl animate-fade-up"
                style={{ animationDelay: "350ms" }}
              >
                {product.description}
              </p>

              {/* Key specs */}
              <div
                className="mt-10 grid sm:grid-cols-2 gap-4 max-w-xl animate-fade-up"
                style={{ animationDelay: "450ms" }}
              >
                {product.botanical && (
                  <SpecRow label="Botanical" value={<em>{product.botanical}</em>} />
                )}
                <SpecRow label="Origin"       value={product.origin} />
                <SpecRow label="Retail packs" value={product.retail_packs.join(" · ")} />
                <SpecRow label="Bulk packs"   value={product.bulk_packs.join(" · ")} />
                {product.retail_price && (
                  <SpecRow
                    label="Retail price"
                    value={
                      <span className="text-gold-700 font-semibold text-lg">
                        {product.currency ?? "AED"} {product.retail_price.toFixed(2)}
                        <span className="text-sm font-normal text-forest-700/60 ml-1">/ 100g</span>
                      </span>
                    }
                  />
                )}
                {product.wholesale_price && (
                  <SpecRow
                    label="Wholesale price"
                    value={
                      <span className="text-forest-700 font-semibold text-lg">
                        {product.currency ?? "AED"} {product.wholesale_price.toFixed(2)}
                        <span className="text-sm font-normal text-forest-700/60 ml-1">/ 100g</span>
                      </span>
                    }
                  />
                )}
              </div>

              <div
                className="mt-10 flex flex-wrap gap-4 animate-fade-up"
                style={{ animationDelay: "550ms" }}
              >
                <ProductOrderButton product={product} />
                <Link href="/wholesale" className="btn-outline">
                  Wholesale options
                </Link>
              </div>
            </div>

            {/* Right: product image */}
            <div className="lg:col-span-5 order-1 lg:order-2 relative">
              <div className="relative aspect-[3/4] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[80%] aspect-square rounded-full bg-gradient-to-br from-gold-500/20 to-forest-700/10 blur-3xl" />
                </div>
                {displayImage && (
                  <img
                    src={displayImage}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl animate-scale-in"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 lg:py-28 bg-cream-100 grain">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
          <Reveal className="max-w-3xl">
            <div className="eyebrow text-gold-700 mb-4">The story</div>
            <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight mb-8 italic">
              {product.tagline}
            </h2>
            <p className="text-lg text-forest-700/85 leading-relaxed">{product.story}</p>
          </Reveal>
        </div>
      </section>

      {/* Features + Uses */}
      <section className="py-20 lg:py-28 bg-forest-700 text-cream-200 relative overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-30" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16">
          <Reveal>
            <div className="eyebrow text-gold-500 mb-5">Quality features</div>
            <h2 className="font-display text-4xl lg:text-5xl text-gold-200 leading-tight mb-8">
              What makes it <span className="italic">premium.</span>
            </h2>
            <ul className="space-y-5">
              {product.features.map((f, i) => (
                <li key={i} className="flex gap-4">
                  <span className="text-gold-500 font-display text-2xl leading-none translate-y-[-2px]">✦</span>
                  <span className="text-cream-200 leading-relaxed">{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="eyebrow text-gold-500 mb-5">Typical uses</div>
            <h2 className="font-display text-4xl lg:text-5xl text-gold-200 leading-tight mb-8">
              How it's <span className="italic">used.</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {product.uses.map((u, i) => (
                <div key={u} className="border border-gold-500/30 bg-forest-800/30 p-5">
                  <div className="font-display text-3xl text-gold-500 mb-1">0{i + 1}</div>
                  <div className="text-sm text-cream-100">{u}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pack sizes */}
      <section className="py-20 lg:py-28 bg-cream-50 relative">
        <div className="absolute inset-0 pattern-arabesque opacity-30" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal className="text-center max-w-2xl mx-auto mb-12">
            <Flourish className="w-24 h-6 text-gold-500 mx-auto mb-5" />
            <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight mb-4">
              Retail & <span className="italic text-gold-700">bulk.</span>
            </h2>
            <p className="text-lg text-forest-700/70">
              Available across retail and wholesale formats — combined deliveries and mixed cases welcomed.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-cream-100 border border-gold-500/30 p-8 h-full">
                <div className="eyebrow text-gold-700 mb-4">Retail</div>
                <div className="flex flex-wrap gap-3">
                  {product.retail_packs.map((p) => (
                    <span key={p} className="px-4 py-2 border border-forest-700/20 font-display text-lg text-forest-700">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-forest-700/70 mt-5 leading-relaxed">
                  High-barrier zipper pouches · barcoded · shelf-ready cartons available.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="bg-forest-700 text-cream-200 p-8 h-full">
                <div className="eyebrow text-gold-500 mb-4">Bulk / Wholesale</div>
                <div className="flex flex-wrap gap-3">
                  {product.bulk_packs.map((p) => (
                    <span key={p} className="px-4 py-2 border border-gold-500/40 font-display text-lg text-gold-200">
                      {p}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-cream-200/80 mt-5 leading-relaxed">
                  Sealed bags & export cartons · CoA & traceability on request.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 bg-cream-100">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight mb-6">
            Interested in <span className="italic text-gold-700">{product.name}</span>?
          </h2>
          <p className="text-lg text-forest-700/70 max-w-xl mx-auto mb-8">
            Send an enquiry and we'll share the latest price list, specifications
            and — where appropriate — samples for quality checking.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Request a quote</Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "447733058067"}`}
              target="_blank"
              className="btn-outline"
            >
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-t border-gold-500/40 pt-3">
      <div className="eyebrow text-forest-700/60 mb-1">{label}</div>
      <div className="text-forest-700 text-base">{value}</div>
    </div>
  );
}
