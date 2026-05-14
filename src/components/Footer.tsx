"use client";
import Link from "next/link";
import { useContent } from "@/lib/content";

export default function Footer() {
  const c = useContent();

  const registeredLines = c("company_address_registered", "15 Park Street, Coventry\nCV6 5AT, United Kingdom").split("\n");
  const tradingLines = c("company_address_trading", "4 Maycroft Garden, Grays\nRM17 6BH, United Kingdom").split("\n");
  const phoneRaw = c("company_phone_raw", "447733058067");
  const phoneDisplay = c("company_phone_display", "+44 7733 058 067");
  const email = c("company_email", "aavglobaltraders@gmail.com");

  return (
    <footer className="relative bg-forest-700 text-cream-200 pt-24 pb-8 overflow-hidden">
      {/* Decorative pattern */}
      <div className="absolute inset-0 pattern-arabesque opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[1px] rule-gold" />

      <div className="relative max-w-[1440px] mx-auto px-6 lg:px-12">
        {/* Top */}
        <div className="grid lg:grid-cols-12 gap-12 pb-16 border-b border-gold-500/20">
          <div className="lg:col-span-5">
            {/* Brand mark */}
            <div className="mb-8">
              <div className="flex items-end gap-4 mb-3">
                <svg viewBox="0 0 60 60" className="w-20 h-20 shrink-0" aria-hidden>
                  <defs>
                    <linearGradient id="fg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#E9D696" />
                      <stop offset="100%" stopColor="#C9A961" />
                    </linearGradient>
                  </defs>
                  <circle cx="30" cy="30" r="29" fill="#082A20" stroke="#C9A961" strokeWidth="1" />
                  <path d="M 18 22 Q 27 12, 36 17 Q 31 26, 18 26 Z" fill="#7BB88E" />
                  <path d="M 33 14 Q 44 7, 50 14 Q 43 24, 33 22 Z" fill="#5FA27A" />
                  <text
                    x="30"
                    y="47"
                    textAnchor="middle"
                    fontFamily="Georgia, serif"
                    fontSize="26"
                    fontStyle="italic"
                    fill="url(#fg-gold)"
                  >
                    ila
                  </text>
                </svg>
                <div>
                  <div className="font-display text-6xl font-black italic text-gold-200 leading-none">ila</div>
                  <div className="text-sm tracking-[0.4em] text-gold-500 uppercase font-semibold mt-1">
                    Gold Spices
                  </div>
                </div>
              </div>
              <div className="h-[1px] w-24 bg-gold-500/40 mb-6" />
              <p className="text-base text-cream-200/80 leading-relaxed max-w-md mb-5">
                {c("footer_tagline", "From the mist of Kerala's Western Ghats to kitchens across the United Kingdom — premium spices, nuts and dates, packed with care.")}
              </p>
              <div className="text-xs tracking-[0.25em] uppercase text-gold-500/70 font-medium">
                {c("footer_brand_label", "A brand of AAV Global Traders Ltd")}
              </div>
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
            © {new Date().getFullYear()} {c("company_name", "AAV Global Traders Ltd")}. Company No. {c("company_no", "16881661")} · EORI {c("company_eori", "GB045558502000")}
          </div>
          <div className="flex items-center gap-6">
            <span className="text-gold-500/80">ﻫﻴﻞ · فلفل · كاجو · تمر</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
