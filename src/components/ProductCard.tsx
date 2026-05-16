import Link from "next/link";
import { ApiProduct } from "@/lib/api";

export default function ProductCard({ product }: { product: ApiProduct }) {
  const displayImage = product.product_image || product.window_image;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="product-card group block relative"
    >
      <div className="relative aspect-[3/4] bg-gradient-to-b from-cream-200 to-cream-100 overflow-hidden border border-gold-200/40">
        <div className="absolute inset-0 pattern-arabesque opacity-40" />

        <div className="absolute inset-0 flex items-center justify-center p-8 product-card-image">
          {displayImage && (
            <img
              src={displayImage}
              alt={product.name}
              className="max-h-full max-w-full object-contain drop-shadow-2xl"
            />
          )}
        </div>

        {product.coming_soon && (
          <div className="absolute top-4 right-4 bg-forest-700 text-gold-200 text-[0.65rem] tracking-[0.2em] uppercase px-3 py-1.5 z-10">
            Coming Soon
          </div>
        )}

        <div className="absolute top-4 left-4 text-[0.65rem] tracking-[0.25em] uppercase text-forest-700/70">
          {product.category}
        </div>
      </div>

      <div className="pt-5 pb-2">
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="font-display text-xl md:text-[1.35rem] text-forest-700 leading-tight">
            {product.name}
          </h3>
          <span className="text-gold-700 text-sm leading-none translate-y-0.5 group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </div>
        <p className="text-sm italic text-forest-700/60 font-display">
          {product.tagline}
        </p>
      </div>
    </Link>
  );
}
