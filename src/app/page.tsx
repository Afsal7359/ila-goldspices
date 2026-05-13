"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Flourish, SealIcon } from "@/components/Ornaments";
import FeaturedProducts from "@/components/FeaturedProducts";
import { useContent, parseArr } from "@/lib/content";

export default function HomePage() {
  const c = useContent();

  const heroLines = c("home_hero_headline", "Kerala's\ngreen gold,\npacked for\nyour kitchen.").split("\n");
  const storyLines = c("home_story_headline", "From the mist of the\nWestern Ghats").split("\n");

  const QUALITY_PILLARS_FALLBACK = [
    {
      title: "Direct sourcing",
      body: "Trusted processors and selected farmers in Kerala's Western Ghats for cardamom and pepper, established exporters for nuts and dates.",
    },
    {
      title: "Laboratory testing",
      body: "Multi-residue pesticide analysis to EU/UK MRLs, aflatoxins, moisture and — where requested — microbiology and heavy metals.",
    },
    {
      title: "Controlled packing",
      body: "FSSAI-licensed facilities in India or UK-controlled conditions, in food-grade high-barrier packaging to protect aroma.",
    },
    {
      title: "Full traceability",
      body: "Every finished pack carries batch number, best-before date, country of origin and UK importer details — linked to supplier lots.",
    },
  ];

  const WHO_WE_SUPPLY_FALLBACK = [
    "Wholesalers & cash-and-carry",
    "Independent & chain grocery",
    "Restaurants, caterers & sweet shops",
    "Online brands & private-label",
    "Export buyers for UK-packed product",
  ];

  const qualityPillars = parseArr<{ title: string; body: string }>(
    c("home_quality_pillars", ""),
    QUALITY_PILLARS_FALLBACK
  );

  const whoWeSupply = parseArr<string>(
    c("home_who_supply", ""),
    WHO_WE_SUPPLY_FALLBACK
  );

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen bg-hero-gradient grain overflow-hidden pt-24">
        {/* Decorative corner ornaments */}
        <div className="absolute top-0 right-0 w-[60%] h-[80%] pattern-arabesque opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[40%] h-[40%] pattern-arabesque opacity-30 pointer-events-none" />

        {/* Soft Kerala hills silhouette */}
        <svg
          className="absolute bottom-0 left-0 right-0 w-full text-forest-700/5"
          viewBox="0 0 1440 240"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 240 L0 140 Q 180 60 340 120 Q 500 180 680 100 Q 860 20 1060 110 Q 1240 200 1440 130 L 1440 240 Z"
            fill="currentColor"
          />
        </svg>

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12 pt-16 lg:pt-20 pb-24">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="lg:col-span-7 relative z-10">
              <div className="animate-fade-up" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-[1px] w-12 bg-gold-500" />
                  <span className="eyebrow text-gold-700">
                    {c("home_hero_eyebrow", "UK-based · Kerala-sourced")}
                  </span>
                </div>
              </div>

              <h1
                className="font-display text-[3rem] sm:text-[4rem] lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.95] text-forest-700 animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                {heroLines[0]}
                {heroLines.length > 1 && <><br /><span className="italic text-gold-700">{heroLines[1]}</span></>}
                {heroLines.slice(2).map((line, i) => (
                  <span key={i}><br />{line}</span>
                ))}
              </h1>

              <p
                className="mt-8 max-w-xl text-lg text-forest-700/80 leading-relaxed animate-fade-up"
                style={{ animationDelay: "400ms" }}
              >
                {c("home_hero_description", "Premium spices, nuts and dates — sourced from the misty hills of the Western Ghats and beyond, lab-tested for safety, and packed with care by a UK-registered company.")}
              </p>

              <div
                className="mt-10 flex flex-wrap gap-4 animate-fade-up"
                style={{ animationDelay: "600ms" }}
              >
                <Link href="/products" className="btn-primary">
                  View Products
                  <ArrowRight />
                </Link>
                <Link href="/wholesale" className="btn-outline">
                  Wholesale Enquiries
                </Link>
              </div>

              {/* Metrics row */}
              <div
                className="mt-16 grid grid-cols-3 gap-6 max-w-lg animate-fade-up"
                style={{ animationDelay: "800ms" }}
              >
                <Metric value="50g→25kg" label="Pack sizes" />
                <Metric value="100%" label="Lab-tested" />
                <Metric value="UK" label="Packed & distributed" />
              </div>
            </div>

            {/* Right: Hero packet */}
            <div className="lg:col-span-5 relative">
              <div
                className="relative z-10 animate-scale-in"
                style={{ animationDelay: "300ms" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[90%] aspect-square rounded-full bg-gradient-to-br from-gold-500/15 to-forest-700/10 blur-3xl" />
                </div>
                <img
                  src="/images/product-cardamom-hero.jpeg"
                  alt="Ila Gold Spices Premium Whole Green Cardamom"
                  className="relative w-full h-auto animate-float-slow"
                />
              </div>

              {/* Floating label card */}
              <div
                className="hidden lg:flex absolute -left-16 top-16 bg-cream-50 border border-gold-200 px-5 py-4 shadow-xl z-20 animate-fade-up items-center gap-3"
                style={{ animationDelay: "900ms" }}
              >
                <div className="w-10 h-10 rounded-full bg-forest-700 flex items-center justify-center text-gold-500">
                  <SealIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-[0.65rem] tracking-[0.25em] uppercase text-gold-700">
                    Certified
                  </div>
                  <div className="text-sm font-medium text-forest-700">
                    FSSAI {c("company_fssai", "11320011000104")}
                  </div>
                </div>
              </div>

              <div
                className="hidden lg:flex absolute -right-6 bottom-20 bg-forest-700 text-gold-200 px-5 py-4 shadow-xl z-20 animate-fade-up items-center gap-3"
                style={{ animationDelay: "1100ms" }}
              >
                <div className="text-2xl font-display italic">100g</div>
                <div className="text-[0.7rem] tracking-[0.2em] uppercase text-gold-500">
                  Retail pouch
                  <br />
                  <span className="normal-case tracking-normal text-[0.7rem] text-cream-200/80">
                    Also in 50g, 200g, 500g
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-forest-700/50">
          <span className="text-[0.65rem] tracking-[0.3em] uppercase">Scroll</span>
          <span className="block w-[1px] h-12 bg-forest-700/30 animate-pulse" />
        </div>
      </section>

      {/* ============ MARQUEE ============ */}
      <section className="relative bg-forest-700 text-gold-500 overflow-hidden py-6 border-y border-gold-500/20">
        <div className="marquee-track whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, repeat) => (
            <div key={repeat} className="flex items-center gap-10 px-5">
              {[
                "Premium Kerala Cardamom",
                "Malabar Black Pepper",
                "Export-Grade Cashews",
                "Middle Eastern Dates",
                "Lab-Tested Quality",
                "UK-Packed & Certified",
                "Private Label Ready",
              ].map((text, i) => (
                <span key={`${repeat}-${i}`} className="flex items-center gap-10">
                  <span className="font-display italic text-2xl md:text-3xl whitespace-nowrap">
                    {text}
                  </span>
                  <span className="text-gold-500/60 text-xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ============ STORY ============ */}
      <section className="relative py-24 lg:py-36 bg-cream-100 grain overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            <Reveal className="lg:col-span-5 relative">
              <div className="aspect-[4/5] relative overflow-hidden">
                <img
                  src="/images/product-cardamom-4.jpeg"
                  alt="Kerala spice — cardamom pods"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-forest-700/70 via-forest-700/40 to-forest-800/70" />

                <div className="absolute inset-0 flex flex-col justify-between p-10 text-gold-200">
                  <div>
                    <div className="eyebrow text-gold-500 mb-4">{c("home_story_eyebrow", "A Kerala Story")}</div>
                    <h3 className="font-display text-4xl lg:text-5xl leading-tight">
                      {storyLines[0]}
                      {storyLines.length > 1 && <><br /><span className="italic">{storyLines[1]}</span></>}
                    </h3>
                  </div>
                  <div>
                    <Flourish className="w-24 h-6 text-gold-500 mb-4" />
                    <p className="italic font-display text-xl leading-snug">
                      {c("home_story_quote", "\"Where cool mist and rich volcanic soil shape the flavour.\"")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating stat card */}
              <div className="hidden lg:block absolute -bottom-10 -right-8 bg-cream-50 border border-gold-200 p-6 shadow-xl z-10 max-w-[220px]">
                <div className="text-5xl font-display text-gold-700 mb-1">7.5<span className="text-xl">mm+</span></div>
                <div className="text-sm text-forest-700/70 leading-snug">
                  Export-grade pods, hand-selected for size & aroma
                </div>
              </div>
            </Reveal>

            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <div className="eyebrow text-gold-700 mb-5">{c("home_about_eyebrow", "Our story")}</div>
              </Reveal>
              <Reveal delay={100}>
                <h2 className="font-display text-5xl lg:text-6xl text-forest-700 leading-[1.05] mb-8">
                  {c("home_about_headline", "Grown up with the fragrance of freshly cracked cardamom.")}
                </h2>
              </Reveal>
              <Reveal delay={200}>
                <div className="space-y-5 text-forest-700/80 text-lg leading-relaxed max-w-xl">
                  <p>
                    {c("home_about_para1", "Ila Gold Spices is the flagship brand of AAV Global Traders Ltd, a UK-registered company based between Coventry and Grays. We started with a simple goal — to bring the true aroma of Kerala's spice gardens to kitchens and businesses across the UK and beyond.")}
                  </p>
                  <p>
                    {c("home_about_para2", "After moving to the UK we saw a gap for spices that combine authentic Kerala origin, proper food-safety testing, and modern packaging — all handled by a UK-based company that understands both worlds.")}
                  </p>
                </div>
              </Reveal>
              <Reveal delay={300}>
                <Link href="/about" className="inline-flex items-center gap-2 mt-10 text-forest-700 border-b border-gold-500 pb-1 hover:gap-3 transition-all">
                  <span className="font-medium">Read our full story</span>
                  <ArrowRight />
                </Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PRODUCTS ============ */}
      <section className="relative py-24 lg:py-36 bg-cream-50">
        <div className="absolute inset-0 pattern-arabesque opacity-30 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <Reveal className="text-center max-w-3xl mx-auto mb-20">
            <div className="eyebrow text-gold-700 mb-5">Our range</div>
            <h2 className="font-display text-5xl lg:text-6xl text-forest-700 leading-tight mb-6">
              A range shaped by
              <br />
              <span className="italic text-gold-700">flavour and care.</span>
            </h2>
            <div className="divider-ornament my-6 max-w-xs mx-auto">
              <span className="text-lg">✦</span>
            </div>
            <p className="text-lg text-forest-700/70 leading-relaxed">
              Cardamom and pepper from the Western Ghats. Cashews, mixed nuts and
              dates from carefully chosen origins. Every product is supported by
              documentation, lab testing and batch-level traceability.
            </p>
          </Reveal>

          <FeaturedProducts />
        </div>
      </section>

      {/* ============ QUALITY PROMISE ============ */}
      <section className="relative py-24 lg:py-36 bg-forest-700 text-cream-100 overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-30 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] rule-gold" />

        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start mb-16">
            <Reveal className="lg:col-span-6">
              <div className="eyebrow text-gold-500 mb-5">{c("home_quality_eyebrow", "Quality promise")}</div>
              <h2 className="font-display text-5xl lg:text-6xl leading-[1.05] text-gold-200">
                {c("home_quality_headline", "Quality is not a slogan — it's a process.")}
              </h2>
            </Reveal>
            <Reveal className="lg:col-span-5 lg:col-start-8" delay={200}>
              <p className="text-lg text-cream-200/90 leading-relaxed">
                {c("home_quality_description", "From farm to finished pack, every lot is evaluated, tested and documented. We combine careful sourcing, third-party laboratory testing and strict packing controls in both India and the UK — so what you receive performs the same way in every batch.")}
              </p>
              <Link
                href="/quality"
                className="inline-flex items-center gap-2 mt-8 text-gold-300 border-b border-gold-500 pb-1 hover:gap-3 transition-all"
              >
                <span>Read the quality process</span>
                <ArrowRight />
              </Link>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {qualityPillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 100}>
                <div className="border border-gold-500/25 bg-forest-800/40 p-8 h-full hover:bg-forest-800/70 transition-colors group">
                  <div className="text-gold-500 mb-5 text-4xl font-display">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-2xl text-gold-200 mb-3">
                    {p.title}
                  </h3>
                  <p className="text-cream-200/70 text-sm leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ WHO WE SUPPLY ============ */}
      <section className="relative py-24 lg:py-36 bg-cream-100 grain">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <Reveal className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5">{c("home_who_eyebrow", "Who we supply")}</div>
            <h2 className="font-display text-5xl lg:text-6xl text-forest-700 leading-tight mb-6">
              {c("home_who_headline", "Wholesalers, retailers, kitchens and brand owners.")}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mt-16">
            {whoWeSupply.map((text, i) => (
              <Reveal key={text} delay={i * 80}>
                <div className="border-t border-gold-500/40 pt-6 h-full">
                  <div className="text-5xl font-display text-gold-700 mb-3">
                    0{i + 1}
                  </div>
                  <p className="text-forest-700 text-lg leading-snug">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="relative py-24 lg:py-32 bg-cream-50 overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40" />
        <div className="relative max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <Reveal>
            <Flourish className="w-32 h-8 text-gold-500 mx-auto mb-8" />
            <h2 className="font-display text-5xl lg:text-7xl text-forest-700 leading-[1.02] mb-8">
              {c("home_cta_headline", "Ready to bring Kerala to your shelves?")}
            </h2>
            <p className="text-xl text-forest-700/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              {c("home_cta_description", "Request our wholesale price list, specifications or samples. We typically reply within 1–2 working days.")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-primary">
                Request a sample
                <ArrowRight />
              </Link>
              <a href="https://wa.me/447733058067" className="btn-outline">
                WhatsApp us
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path
        d="M1 5h12m0 0L9 1m4 4L9 9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-t border-gold-500/40 pt-3">
      <div className="font-display text-2xl lg:text-3xl text-forest-700">
        {value}
      </div>
      <div className="text-[0.65rem] tracking-[0.25em] uppercase text-forest-700/60 mt-1">
        {label}
      </div>
    </div>
  );
}
