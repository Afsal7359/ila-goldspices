"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Flourish } from "@/components/Ornaments";
import { useContent, parseArr } from "@/lib/content";

export default function AboutPage() {
  const c = useContent();

  const values = parseArr<{ title: string; body: string }>(c("about_values"));
  const registeredLines = c("company_address_registered").split("\n").filter(Boolean);
  const tradingLines    = c("company_address_trading").split("\n").filter(Boolean);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5 animate-fade-up">
              {c("about_hero_eyebrow")}
            </div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-8xl text-forest-700 leading-[0.98] animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {c("about_hero_headline")}
            </h1>
            <p
              className="mt-10 text-xl text-forest-700/80 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              {c("about_hero_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="py-20 lg:py-32 bg-cream-100 grain">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="/images/product-cardamom-hero.jpeg"
                alt="Ila Gold Spices — Kerala cardamom"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-forest-700/20 via-transparent to-forest-800/60" />
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-8 text-lg text-forest-700/85 leading-relaxed">
            <Reveal>
              <p>
                {c("about_story_para1")}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p>
                {c("about_story_para2")}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="pt-6 border-t border-gold-500/30">
                <h2 className="font-display text-3xl lg:text-4xl text-forest-700 mb-6">
                  {c("about_values_headline")}
                </h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {values.map((v) => (
                    <div key={v.title}>
                      <div className="text-gold-700 font-display text-2xl italic mb-1">
                        {v.title}
                      </div>
                      <p className="text-base text-forest-700/75 leading-relaxed">
                        {v.body}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product image strip */}
      <section className="py-0 overflow-hidden">
        <div className="flex">
          {[
            { src: "/images/product-cardamom-2.jpeg", alt: "Whole green cardamom" },
            { src: "/images/product-pepper-hero.jpeg", alt: "Malabar black pepper" },
            { src: "/images/product-cashews-hero.jpeg", alt: "Premium cashew nuts" },
            { src: "/images/product-dates.jpeg", alt: "Premium dates" },
          ].map((img) => (
            <div key={img.src} className="flex-1 aspect-square overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Company details */}
      <section className="py-20 lg:py-28 bg-forest-700 text-cream-200 relative overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-30" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="eyebrow text-gold-500 mb-6">Company details</div>
            <h2 className="font-display text-4xl lg:text-5xl text-gold-200 mb-12 leading-tight">
              AAV Global <span className="italic">Traders Ltd.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "Company No.", value: c("company_no") },
              { label: "EORI", value: c("company_eori") },
              { label: "Registered Office", value: registeredLines.join(", ") },
              { label: "Trading Address", value: tradingLines.join(", ") },
            ].map((d, i) => (
              <Reveal key={d.label} delay={i * 80}>
                <div className="border-t border-gold-500/40 pt-5">
                  <div className="eyebrow text-gold-500/80 mb-2">{d.label}</div>
                  <div className="text-base text-cream-100 leading-snug">
                    {d.value}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection ctaHeadline={c("about_cta_headline")} />
    </>
  );
}

function CTASection({ ctaHeadline }: { ctaHeadline: string }) {
  return (
    <section className="relative py-20 lg:py-28 bg-cream-50 overflow-hidden">
      <div className="absolute inset-0 pattern-arabesque opacity-40" />
      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
        <Flourish className="w-32 h-8 text-gold-500 mx-auto mb-6" />
        <h2 className="font-display text-5xl lg:text-6xl text-forest-700 leading-tight mb-8">
          {ctaHeadline}
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Contact us
          </Link>
          <Link href="/products" className="btn-outline">
            Explore products
          </Link>
        </div>
      </div>
    </section>
  );
}
