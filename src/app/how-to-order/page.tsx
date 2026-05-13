"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Flourish } from "@/components/Ornaments";
import { useContent, parseArr } from "@/lib/content";

const STEPS_FALLBACK = [
  {
    title: "Send an enquiry",
    body: "Introduce your business and what you're interested in — cardamom, pepper, nuts, dates; retail or bulk. Reach us via the contact page or WhatsApp.",
  },
  {
    title: "Price list & samples",
    body: "We provide our latest wholesale price list and, where appropriate, send small samples for quality checking.",
  },
  {
    title: "Confirm product, pack size & volume",
    body: "We agree on items, quantities, prices, payment terms and delivery schedule.",
  },
  {
    title: "Order & invoice",
    body: "For first orders we typically ask for payment before dispatch. For regular customers, other terms can be discussed.",
  },
  {
    title: "Delivery or collection",
    body: "For UK buyers we can deliver by courier or pallet network, or arrange collection from our agreed warehouse.",
  },
];

const EXPORT_FEATURES_FALLBACK = [
  {
    title: "Ex-India shipments",
    body: "FOB / CIF direct from Indian partner facilities, depending on product and buyer's preference.",
  },
  {
    title: "Ex-UK shipments",
    body: "EXW / FCA from our UK warehouse for UK-packed product destined for export markets.",
  },
  {
    title: "Full documentation",
    body: "Invoice, packing list, CoA, phytosanitary certificate, certificate of origin, B/L or AWB as applicable.",
  },
  {
    title: "Forwarder flexibility",
    body: "Work with your nominated freight forwarder, or we can introduce our own trusted partners.",
  },
];

export default function OrderPage() {
  const c = useContent();

  const steps = parseArr<{ title: string; body: string }>(
    c("order_steps", ""),
    STEPS_FALLBACK
  );

  const exportFeatures = parseArr<{ title: string; body: string }>(
    c("order_export_features", ""),
    EXPORT_FEATURES_FALLBACK
  );

  return (
    <>
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5 animate-fade-up">
              {c("order_hero_eyebrow", "How to order")}
            </div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-8xl text-forest-700 leading-[0.98] animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {c("order_hero_headline", "Simple, from first email to delivery.")}
            </h1>
          </div>
        </div>
      </section>

      {/* UK Trade steps */}
      <section className="py-20 lg:py-32 bg-cream-100 grain">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal className="mb-14">
            <div className="eyebrow text-gold-700 mb-4">{c("order_steps_eyebrow", "UK trade buyers")}</div>
            <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight max-w-3xl">
              {c("order_steps_headline", "Wholesalers, retailers, foodservice.")}
            </h2>
          </Reveal>

          <ol className="space-y-2">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 50}>
                <li
                  className={`group grid md:grid-cols-12 gap-6 md:gap-10 py-10 border-t ${
                    i === steps.length - 1 ? "border-b" : ""
                  } border-gold-500/30 hover:bg-cream-50 transition-colors`}
                >
                  <div className="md:col-span-2 flex items-center gap-4">
                    <span className="font-display text-5xl md:text-6xl text-gold-700 leading-none">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="md:col-span-4">
                    <h3 className="font-display text-2xl lg:text-3xl text-forest-700 leading-tight">
                      {s.title}
                    </h3>
                  </div>
                  <div className="md:col-span-6">
                    <p className="text-lg text-forest-700/80 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Product visual strip */}
      <section className="py-0 overflow-hidden">
        <div className="flex">
          {[
            { src: "/images/product-cardamom-hero.jpeg", alt: "Premium cardamom" },
            { src: "/images/product-pepper-dark.jpeg", alt: "Black pepper" },
            { src: "/images/product-cashews-4.jpeg", alt: "Cashew nuts" },
          ].map((img) => (
            <div key={img.src} className="flex-1 aspect-video overflow-hidden">
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Export shipments */}
      <section className="py-20 lg:py-28 bg-forest-700 text-cream-200 relative overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-25" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <Reveal className="lg:col-span-5">
            <div className="eyebrow text-gold-500 mb-5">{c("order_export_eyebrow", "Export & bulk")}</div>
            <h2 className="font-display text-4xl lg:text-5xl text-gold-200 leading-tight">
              {c("order_export_headline", "For larger international orders.")}
            </h2>
            <p className="mt-6 text-lg text-cream-200/80 leading-relaxed">
              {c("order_export_description", "Typically 500 kg to multiple tonnes — shipped directly from India or from the UK, with full documentation.")}
            </p>
          </Reveal>

          <Reveal className="lg:col-span-7" delay={150}>
            <div className="grid sm:grid-cols-2 gap-4">
              {exportFeatures.map((f) => (
                <div
                  key={f.title}
                  className="border border-gold-500/30 p-6 bg-forest-800/40"
                >
                  <div className="font-display text-xl text-gold-200 mb-2">
                    {f.title}
                  </div>
                  <div className="text-sm text-cream-200/75 leading-relaxed">
                    {f.body}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 border-l-2 border-gold-500">
              <div className="eyebrow text-gold-500 mb-2">For quotations</div>
              <p className="text-base text-cream-200/90 leading-relaxed">
                {c("order_export_note", "Please share your destination, required Incoterm (FOB / CIF / EXW / FCA), volumes and any special quality or packing requirements.")}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-cream-50 text-center relative">
        <div className="absolute inset-0 pattern-arabesque opacity-40" />
        <div className="relative max-w-[1000px] mx-auto px-6 lg:px-12">
          <Flourish className="w-32 h-8 text-gold-500 mx-auto mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight mb-6">
            {c("order_cta_headline", "Ready to send your first enquiry?")}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">
              Start an enquiry
            </Link>
            <a href="https://wa.me/447733058067" className="btn-outline">
              WhatsApp us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
