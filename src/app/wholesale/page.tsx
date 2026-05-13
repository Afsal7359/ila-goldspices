"use client";
import { useState } from "react";
import Reveal from "@/components/Reveal";
import { Flourish } from "@/components/Ornaments";
import { api } from "@/lib/api";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { useContent, parseArr } from "@/lib/content";

const OFFERINGS_FALLBACK = [
  {
    eyebrow: "Ila Gold Spices branded",
    title: "Ready-to-shelf retail packs.",
    body: "Own-brand retail pouches for independent and chain stores, with shelf-ready cartons and barcoded packs for easy handling.",
    points: [
      "50 g – 500 g retail pouches",
      "Mixed cases & combined deliveries",
      "High-barrier zipper pouches",
      "Barcoded · shelf-ready",
    ],
    featured: false,
  },
  {
    eyebrow: "Bulk ingredients",
    title: "Consistent specs for kitchens & manufacturers.",
    body: "1 kg to 25 kg formats for restaurants, caterers, ready-meal producers, spice blenders and tea companies.",
    points: [
      "1 kg, 5 kg, 10–25 kg bags & cartons",
      "CoA and batch traceability",
      "Consistent grade across deliveries",
      "Scheduled regular supply",
    ],
    featured: true,
  },
  {
    eyebrow: "Private label",
    title: "Your brand, our supply chain.",
    body: "For larger volumes we can pack cardamom, pepper, nuts or dates under your own brand — with full sourcing and QC.",
    points: [
      "Sourcing & quality control",
      "Packing in agreed material & sizes",
      "Label content for UK compliance",
      "MOQ & dev fees apply",
    ],
    featured: false,
  },
];

const PROCESS_STEPS_FALLBACK = [
  {
    step: "01",
    title: "Brief",
    body: "Share product, pack size, approximate volumes and target market.",
  },
  {
    step: "02",
    title: "Sample & spec",
    body: "We send samples, CoAs, and draft specifications for approval.",
  },
  {
    step: "03",
    title: "Artwork & packing",
    body: "We assist with label content for UK compliance and pack your brand.",
  },
  {
    step: "04",
    title: "Deliver",
    body: "Retail-ready cartons delivered to your warehouse — UK or export.",
  },
];

export default function WholesalePage() {
  const c = useContent();
  const [form, setForm] = useState({ company_name: "", contact_name: "", email: "", phone: "", country: "", products_interested: "", quantity: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.saveWholesaleInquiry(form);
    const msg = `🌿 *Wholesale Enquiry — Ila Gold Spices*\n\nCompany: ${form.company_name}\nContact: ${form.contact_name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCountry: ${form.country}\nProducts: ${form.products_interested}\nQuantity: ${form.quantity}\n\nMessage:\n${form.message}`;
    window.open(getWhatsAppLink(msg), "_blank");
    setSubmitted(true);
  };

  const offerings = parseArr<{
    eyebrow: string;
    title: string;
    body: string;
    points: string[];
    featured: boolean;
  }>(c("wholesale_offerings", ""), OFFERINGS_FALLBACK);

  const processSteps = parseArr<{ step: string; title: string; body: string }>(
    c("wholesale_process_steps", ""),
    PROCESS_STEPS_FALLBACK
  );

  return (
    <>
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5 animate-fade-up">
              {c("wholesale_hero_eyebrow", "Wholesale & private label")}
            </div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-8xl text-forest-700 leading-[0.98] animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {c("wholesale_hero_headline", "Our brand or yours.")}
            </h1>
            <p
              className="mt-10 text-xl text-forest-700/80 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              {c("wholesale_hero_description", "Whether you are a wholesaler, a retailer, a restaurant group or a brand owner, we can tailor packs and specifications to your needs.")}
            </p>
          </div>
        </div>
      </section>

      {/* Three offering cards */}
      <section className="py-20 lg:py-28 bg-cream-100 grain">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-3 gap-6">
            {offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 100}>
                <div
                  className={`h-full p-10 border ${
                    o.featured
                      ? "bg-forest-700 border-forest-700 text-cream-200"
                      : "bg-cream-50 border-gold-500/30 text-forest-700"
                  }`}
                >
                  <div
                    className={`font-display text-6xl italic mb-6 ${
                      o.featured ? "text-gold-500" : "text-gold-700"
                    }`}
                  >
                    0{i + 1}
                  </div>
                  <div
                    className={`eyebrow mb-3 ${
                      o.featured ? "text-gold-500" : "text-gold-700"
                    }`}
                  >
                    {o.eyebrow}
                  </div>
                  <h3
                    className={`font-display text-3xl leading-tight mb-5 ${
                      o.featured ? "text-gold-200" : "text-forest-700"
                    }`}
                  >
                    {o.title}
                  </h3>
                  <p
                    className={`text-base mb-8 leading-relaxed ${
                      o.featured ? "text-cream-200/85" : "text-forest-700/80"
                    }`}
                  >
                    {o.body}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {o.points.map((p) => (
                      <li
                        key={p}
                        className={`flex gap-3 text-sm leading-relaxed ${
                          o.featured ? "text-cream-200/85" : "text-forest-700/80"
                        }`}
                      >
                        <span className="text-gold-500 translate-y-[-1px]">✦</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="py-20 lg:py-32 bg-forest-700 text-cream-200 relative overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-25" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal className="max-w-3xl mb-16">
            <div className="eyebrow text-gold-500 mb-5">{c("wholesale_process_eyebrow", "Private label process")}</div>
            <h2 className="font-display text-4xl lg:text-5xl text-gold-200 leading-tight">
              {c("wholesale_process_headline", "From concept to first delivery.")}
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div className="border-t border-gold-500/40 pt-5">
                  <div className="font-display text-5xl text-gold-500 mb-3">
                    {s.step}
                  </div>
                  <div className="font-display text-2xl text-gold-200 mb-2">
                    {s.title}
                  </div>
                  <p className="text-sm text-cream-200/75 leading-relaxed">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16">
            <p className="text-base text-cream-200/70 italic border-l-2 border-gold-500 pl-6 max-w-2xl">
              {c("wholesale_process_note", "Minimum order quantities and development fees apply for private-label projects. Please share your approximate volumes and target market with your enquiry.")}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Wholesale Enquiry Form */}
      <section className="py-20 lg:py-28 bg-cream-50 relative">
        <div className="absolute inset-0 pattern-arabesque opacity-30" />
        <div className="relative max-w-[900px] mx-auto px-6 lg:px-12">
          <Flourish className="w-32 h-8 text-gold-500 mx-auto mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight mb-2 text-center">
            {c("wholesale_form_headline", "Share your brief.")}
          </h2>
          <p className="text-lg text-forest-700/70 mb-10 max-w-xl mx-auto text-center">
            {c("wholesale_form_description", "We'll reply with a proposal within 1–2 working days.")}
          </p>

          {submitted ? (
            <div className="bg-forest-700 text-cream-200 p-10 text-center">
              <Flourish className="w-20 h-5 text-gold-500 mx-auto mb-4" />
              <h3 className="font-display text-2xl text-gold-300 mb-2">Enquiry received!</h3>
              <p className="text-cream-200/80 text-sm">Your details have been saved and sent to our WhatsApp. We'll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="bg-white border border-gold-500/20 p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <WField label="Company Name" name="company_name" value={form.company_name} onChange={onChange} />
                <WField label="Contact Name *" name="contact_name" value={form.contact_name} onChange={onChange} required />
                <WField label="Email *" name="email" type="email" value={form.email} onChange={onChange} required />
                <WField label="Phone / WhatsApp" name="phone" value={form.phone} onChange={onChange} />
                <WField label="Country" name="country" value={form.country} onChange={onChange} />
                <WField label="Products Interested In" name="products_interested" value={form.products_interested} onChange={onChange} placeholder="Cardamom, Pepper, Cashews..." />
              </div>
              <WField label="Approximate Quantity" name="quantity" value={form.quantity} onChange={onChange} placeholder="e.g. 50 kg/month" />
              <div>
                <label className="eyebrow text-forest-700/70 block mb-2">Message</label>
                <textarea name="message" value={form.message} onChange={onChange} rows={4}
                  placeholder="Target market, quality requirements, packing preferences…"
                  className="w-full bg-transparent border-b border-forest-700/30 py-3 px-1 focus:border-gold-700 focus:outline-none text-forest-700 placeholder:text-forest-700/40 resize-none" />
              </div>
              <button type="submit" className="btn-primary">
                Send Wholesale Enquiry →
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function WField({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="eyebrow text-forest-700/70 block mb-1">{label}</label>
      <input {...props} className="w-full bg-transparent border-b border-forest-700/30 py-2.5 px-1 focus:border-gold-700 focus:outline-none text-forest-700 text-sm" />
    </div>
  );
}
