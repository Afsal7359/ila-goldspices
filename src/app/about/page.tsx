"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Flourish } from "@/components/Ornaments";
import { useContent, parseArr } from "@/lib/content";

export default function AboutPage() {
  const c = useContent();

  const VALUES_FALLBACK = [
    {
      title: "Honesty",
      body: "Clear specifications, transparent documentation and straightforward communication.",
    },
    {
      title: "Quality",
      body: "Export-grade products with lab testing and controlled packing.",
    },
    {
      title: "Long-term partnerships",
      body: "We aim to build stable relationships with suppliers and buyers.",
    },
    {
      title: "Respect for origin",
      body: "Fair value for the farmers and processors who grow and handle our spices.",
    },
  ];

  const values = parseArr<{ title: string; body: string }>(
    c("about_values", ""),
    VALUES_FALLBACK
  );

  const registeredLines = c("company_address_registered", "15 Park Street, Coventry CV6 5AT, UK").split("\n");
  const tradingLines = c("company_address_trading", "4 Maycroft Garden, Grays RM17 6BH, UK").split("\n");

  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5 animate-fade-up">
              {c("about_hero_eyebrow", "About · Ila Gold Spices")}
            </div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-8xl text-forest-700 leading-[0.98] animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {c("about_hero_headline", "A Kerala story, built in the UK.")}
            </h1>
            <p
              className="mt-10 text-xl text-forest-700/80 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              {c("about_hero_description", "We started with a simple goal — to bring the true aroma of Kerala's spice gardens to kitchens and businesses across the UK and beyond.")}
            </p>
          </div>
        </div>
      </section>

      {/* Founder story */}
      <section className="py-20 lg:py-32 bg-cream-100 grain">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img
                src="/images/product-cardamom-hero.jpeg"
                alt="Ila Gold Spices — Kerala cardamom"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-forest-700/30 via-transparent to-forest-800/85" />
              <div className="absolute inset-0 flex flex-col justify-between p-10 text-gold-200">
                <div className="eyebrow text-gold-500">Founder</div>
                <div>
                  <Flourish className="w-28 h-6 text-gold-500 mb-5" />
                  <div className="font-display text-4xl leading-tight">
                    {c("about_founder_name", "Muhammed Afeef")}
                    <br />
                    <span className="italic">{c("about_founder_surname", "Vadakkeni")}</span>
                  </div>
                  <div className="mt-4 text-sm tracking-widest uppercase text-gold-500/80">
                    {c("about_founder_title", "Founder, AAV Global Traders Ltd")}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-7 space-y-8 text-lg text-forest-700/85 leading-relaxed">
            <Reveal>
              <p>
                <span className="font-display text-5xl text-gold-700 float-left leading-none mr-3 mt-1">
                  G
                </span>
                {c("about_story_para1", "rowing up with the fragrance of freshly cracked cardamom pods and pepper roasted in homemade masalas, we know how much quality matters. After moving to the UK we saw a gap for spices that combine authentic Kerala origin, proper food-safety testing and modern packaging — all handled by a UK-based company that understands both worlds.")}
              </p>
            </Reveal>
            <Reveal delay={100}>
              <p>
                {c("about_story_para2", "Today we work with a network of reliable processors and farmers in Kerala and selected origins, importing and packing whole green cardamom, black pepper, cashew nuts, mixed nuts and dates. Our aim is to offer products that are not only flavourful, but also safe, consistent and traceable.")}
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="pt-6 border-t border-gold-500/30">
                <h2 className="font-display text-3xl lg:text-4xl text-forest-700 mb-6">
                  {c("about_values_headline", "Our values.")}
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
              { label: "Company No.", value: c("company_no", "16881661") },
              { label: "EORI", value: c("company_eori", "GB045558502000") },
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

      <CTASection ctaHeadline={c("about_cta_headline", "Let's talk about what you need.")} />
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
