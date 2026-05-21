"use client";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { Flourish, SealIcon } from "@/components/Ornaments";
import { useContent, parseArr } from "@/lib/content";

// Hardcoded Icon components by index (SVGs cannot be stored in Firestore)
const PILLAR_ICONS = [
  ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <path
        d="M 20 4 Q 34 14, 30 32 Q 16 28, 10 18 Q 14 10, 20 4 Z"
        fill="currentColor"
      />
      <path d="M 20 6 Q 22 18, 27 30" stroke="white" strokeWidth="0.8" opacity="0.4" fill="none" />
    </svg>
  ),
  ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <rect x="14" y="6" width="12" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M 13 20 L 10 32 Q 20 28, 30 32 L 27 20 Z" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M 16 10 L 24 10 M 16 14 L 24 14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <rect x="6" y="8" width="28" height="26" stroke="currentColor" strokeWidth="2" />
      <path d="M 6 16 L 34 16" stroke="currentColor" strokeWidth="2" />
      <path d="M 14 22 L 26 22 M 14 26 L 22 26" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
];


export default function QualityPage() {
  const c = useContent();

  const pillars = parseArr<{
    title: string;
    image: string;
    headline: string;
    body: string[];
    details: string[];
  }>(c("quality_pillars"));

  const certs = parseArr<{ title: string; body: string }>(
    c("quality_certs")
  );

  return (
    <>
      <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 bg-hero-gradient grain overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl">
            <div className="eyebrow text-gold-700 mb-5 animate-fade-up">
              {c("quality_hero_eyebrow")}
            </div>
            <h1
              className="font-display text-5xl sm:text-6xl lg:text-8xl text-forest-700 leading-[0.98] animate-fade-up"
              style={{ animationDelay: "150ms" }}
            >
              {c("quality_hero_headline")}
            </h1>
            <p
              className="mt-10 text-xl text-forest-700/80 leading-relaxed max-w-2xl animate-fade-up"
              style={{ animationDelay: "300ms" }}
            >
              {c("quality_hero_description")}
            </p>
          </div>
        </div>
      </section>

      {/* Three-pillar section */}
      <section className="py-20 lg:py-32 bg-cream-100 grain">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12 space-y-24">
          {pillars.map((p, i) => {
            const Icon = PILLAR_ICONS[i] ?? PILLAR_ICONS[0];
            return (
              <Reveal key={p.title}>
                <div
                  className={`grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                    i % 2 === 1 ? "lg:[direction:rtl]" : ""
                  }`}
                >
                  <div className={`lg:col-span-5 [direction:ltr]`}>
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-forest-700/50 to-forest-800/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-[16rem] font-display text-gold-500/20 leading-none">
                          0{i + 1}
                        </div>
                      </div>
                      <div className="absolute inset-0 p-10 flex flex-col justify-end text-gold-200">
                        <div className="w-14 h-14 rounded-full border border-gold-500 flex items-center justify-center mb-4">
                          <Icon className="w-8 h-8 text-gold-500" />
                        </div>
                        <h3 className="font-display text-4xl italic">
                          {p.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                  <div className={`lg:col-span-7 [direction:ltr]`}>
                    <div className="eyebrow text-gold-700 mb-3">Chapter 0{i + 1}</div>
                    <h2 className="font-display text-4xl lg:text-5xl text-forest-700 mb-6 leading-tight">
                      {p.headline}
                    </h2>
                    <div className="space-y-4 text-lg text-forest-700/80 leading-relaxed">
                      {p.body.map((line, j) => (
                        <p key={j}>{line}</p>
                      ))}
                    </div>
                    {p.details && (
                      <ul className="mt-6 space-y-3">
                        {p.details.map((d, j) => (
                          <li key={j} className="flex gap-3">
                            <span className="text-gold-700 font-display text-xl leading-none translate-y-[-2px]">
                              ✦
                            </span>
                            <span className="text-forest-700/85">{d}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 lg:py-28 bg-forest-700 text-cream-200 relative overflow-hidden">
        <div className="absolute inset-0 pattern-arabesque opacity-25" />
        <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
          <Reveal>
            <div className="eyebrow text-gold-500 mb-5">{c("quality_certs_eyebrow")}</div>
            <h2 className="font-display text-4xl lg:text-5xl text-gold-200 leading-tight max-w-2xl mb-12">
              {c("quality_certs_headline")}
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6">
            {certs.map((cert, i) => (
              <Reveal key={cert.title} delay={i * 100}>
                <div className="border border-gold-500/30 p-8 h-full">
                  <SealIcon className="w-10 h-10 text-gold-500 mb-5" />
                  <div className="font-display text-2xl text-gold-200 mb-3">
                    {cert.title}
                  </div>
                  <p className="text-sm text-cream-200/80 leading-relaxed">
                    {cert.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 max-w-3xl">
            <p className="text-base text-cream-200/70 italic leading-relaxed border-l-2 border-gold-500 pl-6">
              {c("quality_certs_note")}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-cream-50">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
          <Flourish className="w-32 h-8 text-gold-500 mx-auto mb-6" />
          <h2 className="font-display text-4xl lg:text-5xl text-forest-700 leading-tight mb-6">
            {c("quality_cta_headline")}
          </h2>
          <p className="text-lg text-forest-700/70 max-w-xl mx-auto mb-8">
            {c("quality_cta_description")}
          </p>
          <Link href="/contact" className="btn-primary">
            Request documentation
          </Link>
        </div>
      </section>
    </>
  );
}
