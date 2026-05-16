"use client";
import Link from "next/link";
import { useContent } from "@/lib/content";
import FeaturedProducts from "@/components/FeaturedProducts";

export default function HomePage() {
  const c = useContent();

  const heroLines = c("home_hero_headline", "Kerala's\nGreen Gold").split("\n");

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────── */}
      <section className="pt-20 bg-cream-50 overflow-hidden">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 min-h-[88vh] items-center">
          {/* Left copy */}
          <div className="px-8 lg:px-16 py-16 lg:py-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-8 bg-gold-600" />
              <span className="text-[0.7rem] tracking-[0.22em] uppercase text-gold-700 font-semibold">
                {c("home_hero_eyebrow", "UK Based · Kerala Sourced")}
              </span>
            </div>

            <h1 className="font-display leading-[1.05] mb-6">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-forest-700">
                {heroLines[0]}
              </span>
              {heroLines[1] && (
                <span className="block text-5xl sm:text-6xl lg:text-7xl font-black text-gold-600">
                  {heroLines[1]}
                </span>
              )}
            </h1>

            <p className="text-base lg:text-lg text-forest-700/70 leading-relaxed max-w-lg mb-10">
              {c("home_hero_description", "Premium spices, nuts and dates – sourced from the misty hills of the Western Ghats and beyond, lab-tested for safety, and packed with care in a UK-registered company.")}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="inline-flex items-center gap-2 bg-forest-700 text-cream-100 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 hover:bg-forest-800 transition-colors">
                View Products <ArrowRight />
              </Link>
              <Link href="/wholesale" className="inline-flex items-center gap-2 border-2 border-forest-700 text-forest-700 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 hover:bg-forest-700 hover:text-cream-100 transition-all">
                Wholesale Enquiry
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="relative h-[60vw] lg:h-full min-h-[400px] bg-cream-100">
            <img
              src="/images/product-cardamom-hero.jpeg"
              alt="Ila Gold Spices Premium Whole Green Cardamom"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ────────────────────────────────────── */}
      <section className="bg-forest-700">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-forest-600">
            {[
              { icon: <ShieldIcon />, text: "UK Registered Company" },
              { icon: <LeafIcon />,   text: "Sourced from Kerala" },
              { icon: <FlaskIcon />,  text: "Lab Tested for Quality" },
              { icon: <BoxIcon />,    text: "50g – 25kg Packs Available" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-4 px-6 lg:px-8 py-6">
                <span className="text-gold-400 shrink-0">{f.icon}</span>
                <span className="text-sm text-cream-200 font-medium leading-snug">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-cream-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="h-[1px] w-10 bg-gold-500" />
              <span className="text-[0.65rem] tracking-[0.3em] uppercase text-gold-700 font-semibold">
                {c("home_products_eyebrow", "Our Premium Range")}
              </span>
              <span className="h-[1px] w-10 bg-gold-500" />
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-forest-700">
              {c("home_products_headline", "Pure Spices, Perfect Flavor")}
            </h2>
          </div>
          <FeaturedProducts />
        </div>
      </section>

      {/* ── STORY ───────────────────────────────────────────── */}
      <section className="bg-cream-100">
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2">
          {/* Image */}
          <div className="relative h-72 lg:h-auto min-h-[420px]">
            <img
              src="/images/product-cardamom-bulk.jpeg"
              alt="Kerala spice gardens"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          {/* Text */}
          <div className="px-10 lg:px-16 py-16 lg:py-24 flex flex-col justify-center">
            <div className="text-[0.7rem] tracking-[0.25em] uppercase text-gold-700 font-semibold mb-4">
              {c("home_about_eyebrow", "Our Story")}
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-forest-700 leading-tight mb-6">
              {c("home_about_headline", "From Kerala to Kitchens Across the UK")}
            </h2>
            <p className="text-base text-forest-700/75 leading-relaxed mb-8 max-w-lg">
              {c("home_about_para1", "From the misty hills of Kerala, we bring you handpicked spices known for their rich aroma and superior quality. Carefully sourced and packed in the UK, Ila Gold Spices ensures freshness in every pack.")}
            </p>
            <Link href="/about" className="inline-flex items-center gap-2 bg-forest-700 text-cream-100 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 self-start hover:bg-forest-800 transition-colors">
              Learn More <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHOLESALE ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-forest-700">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="text-[0.7rem] tracking-[0.25em] uppercase text-gold-500 font-semibold mb-4">
              {c("home_who_eyebrow", "For Businesses")}
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-black text-cream-100 leading-tight mb-6">
              {c("home_wholesale_headline", "Wholesale & Bulk Supply")}
            </h2>
            <p className="text-base text-cream-200/75 leading-relaxed mb-10 max-w-lg">
              {c("home_wholesale_description", "We supply premium quality spices in bulk for retailers, wholesalers, and food businesses across the UK.")}
            </p>
            <Link href="/wholesale" className="inline-flex items-center gap-2 border-2 border-gold-500 text-gold-300 text-sm font-semibold tracking-wider uppercase px-7 py-3.5 hover:bg-gold-500 hover:text-forest-800 transition-all">
              Request Pricing
            </Link>
          </div>

          {/* Right — 3 features */}
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: <TagIcon />,   title: "Competitive Pricing" },
              { icon: <ShieldCheckIcon />, title: "Consistent Quality" },
              { icon: <TruckIcon />, title: "Reliable UK Distribution" },
            ].map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 rounded-full border border-gold-500/40 flex items-center justify-center text-gold-400">
                  {f.icon}
                </div>
                <span className="text-sm text-cream-200 font-semibold leading-snug">{f.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEO (shows only when URL set in admin) ─────────── */}
      <VideoSection
        videoUrl={c("home_video_url", "")}
        eyebrow={c("home_video_eyebrow", "See it in action")}
        headline={c("home_video_headline", "Watch how we source and pack.")}
      />
    </>
  );
}

/* ── Small helper components ──────────────────────────────── */

function ArrowRight() {
  return (
    <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M1 5h12m0 0L9 1m4 4L9 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
    </svg>
  );
}

function getYouTubeId(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return m ? m[1] : null;
}

function VideoSection({ videoUrl, eyebrow, headline }: { videoUrl: string; eyebrow: string; headline: string }) {
  const id = getYouTubeId(videoUrl);
  if (!id) return null;
  return (
    <section className="py-20 lg:py-28 bg-forest-800">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-10">
          <div className="text-[0.7rem] tracking-[0.25em] uppercase text-gold-500 font-semibold mb-3">{eyebrow}</div>
          <h2 className="font-display text-4xl lg:text-5xl font-black text-gold-200">{headline}</h2>
        </div>
        <div className="relative w-full aspect-video border border-gold-500/20 shadow-2xl">
          <iframe
            src={`https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`}
            title={headline}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ── Icon components ──────────────────────────────────────── */
const iconCls = "w-6 h-6";

function ShieldIcon() {
  return <svg className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
}
function LeafIcon() {
  return <svg className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>;
}
function FlaskIcon() {
  return <svg className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15M14.25 3.104c.251.023.501.05.75.082M19.8 15a2.25 2.25 0 00.217-1.02l-.65-9.101a2.25 2.25 0 00-2.247-2.076H6.88a2.25 2.25 0 00-2.247 2.076L4 14.98a2.25 2.25 0 00.217 1.02M19.8 15H4.2" /></svg>;
}
function BoxIcon() {
  return <svg className={iconCls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /></svg>;
}
function TagIcon() {
  return <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.658.508a18.01 18.01 0 005.93-5.93c.364-.878.19-1.96-.508-2.657L11.25 3.659A2.25 2.25 0 009.659 3H9.57z" /><path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" /></svg>;
}
function ShieldCheckIcon() {
  return <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>;
}
function TruckIcon() {
  return <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>;
}
