"use client";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/lib/content";

export default function Footer() {
  const c = useContent();

  const registeredLines = c("company_address_registered").split("\n");
  const tradingLines = c("company_address_trading").split("\n");
  const phoneRaw = c("company_phone_raw");
  const phoneDisplay = c("company_phone_display");
  const email = c("company_email");

  return (
    <footer className="relative bg-forest-700 text-cream-200 pt-24 pb-8 overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 pattern-arabesque opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] rule-gold" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-gold-500/20">
          <div className="lg:col-span-4">
            <Image
              src="/images/image.png"
              alt="Ila Gold Spices"
              width={300}
              height={300}
              className="h-20 w-auto object-contain mb-5"
            />
            <p className="text-sm text-cream-200/75 leading-relaxed max-w-xs mb-5">
              {c("footer_tagline")}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a href={`https://wa.me/${c("company_whatsapp")}`} aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-forest-500 flex items-center justify-center text-cream-200/70 hover:text-gold-400 hover:border-gold-500 transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.449A11.9 11.9 0 0012.05 0C5.495 0 .16 5.335.16 11.89c0 2.096.547 4.142 1.588 5.945L.057 24l6.304-1.654a11.87 11.87 0 005.69 1.448h.005c6.555 0 11.89-5.335 11.89-11.89a11.82 11.82 0 00-3.426-8.455z"/></svg>
              </a>
              <a href={`mailto:${c("company_email")}`} aria-label="Email"
                className="w-9 h-9 rounded-full border border-forest-500 flex items-center justify-center text-cream-200/70 hover:text-gold-400 hover:border-gold-500 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-gold-500 mb-5">Explore</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="hover:text-gold-300 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-gold-300 transition-colors">About</Link></li>
              <li><Link href="/products" className="hover:text-gold-300 transition-colors">Products</Link></li>
              <li><Link href="/quality" className="hover:text-gold-300 transition-colors">Quality</Link></li>
              <li><Link href="/wholesale" className="hover:text-gold-300 transition-colors">Wholesale</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="eyebrow text-gold-500 mb-5">Range</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/products/whole-green-cardamom" className="hover:text-gold-300 transition-colors">Green Cardamom</Link></li>
              <li><Link href="/products/ground-cardamom" className="hover:text-gold-300 transition-colors">Ground Cardamom</Link></li>
              <li><Link href="/products/black-pepper" className="hover:text-gold-300 transition-colors">Black Pepper</Link></li>
              <li><Link href="/products/cashew-nuts" className="hover:text-gold-300 transition-colors">Cashew Nuts</Link></li>
              <li><Link href="/products/dates" className="hover:text-gold-300 transition-colors">Dates</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="eyebrow text-gold-500 mb-5">Contact</div>
            <address className="not-italic text-sm space-y-3 leading-relaxed">
              <div>
                <div className="text-gold-300/90 text-xs uppercase tracking-wider mb-1">Registered Office</div>
                {registeredLines.map((line, i) => (
                  <span key={i}>{line}{i < registeredLines.length - 1 && <br />}</span>
                ))}
              </div>
              <div>
                <div className="text-gold-300/90 text-xs uppercase tracking-wider mb-1">Trading Address</div>
                {tradingLines.map((line, i) => (
                  <span key={i}>{line}{i < tradingLines.length - 1 && <br />}</span>
                ))}
              </div>
              <div className="pt-1">
                <a href={`tel:+${phoneRaw}`} className="hover:text-gold-300 transition-colors block">
                  {phoneDisplay}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="hover:text-gold-300 transition-colors block"
                >
                  {email}
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-cream-200/60">
          <div>
            © {new Date().getFullYear()} {c("company_name")}. Company No. {c("company_no")} · EORI {c("company_eori")}
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gold-500/80">ﻫﻴﻞ · فلفل · كاجو · تمر</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
