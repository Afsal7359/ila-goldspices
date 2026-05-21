"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navItems = [
  { href: "/products", label: "Products" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-forest-700 border-b border-forest-600">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-3 flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" aria-label="Ila Gold Spices home">
          <Image
            src="/images/logo.png"
            alt="Ila Gold Spices"
            width={854}
            height={670}
            className="h-14 w-auto object-contain brightness-0 invert"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-4 py-2 text-sm text-cream-200 hover:text-gold-300 transition-colors relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-4 right-4 h-[1px] bg-gold-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 border border-gold-500 text-gold-300 text-[0.7rem] tracking-[0.18em] uppercase font-semibold px-5 py-2.5 hover:bg-gold-500 hover:text-forest-800 transition-all"
          >
            Enquire
          </Link>
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-cream-200"
          >
            <span className={`block h-[1.5px] w-6 bg-current transition-transform duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-6 bg-current transition-transform duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden overflow-hidden transition-all duration-400 bg-forest-800 border-t border-forest-600 ${open ? "max-h-96" : "max-h-0"}`}>
        <nav className="flex flex-col py-4 px-6">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)}
              className="py-3 text-cream-200 border-b border-forest-700 last:border-b-0 text-sm">
              {item.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)}
            className="mt-4 border border-gold-500 text-gold-300 text-center py-2.5 text-sm tracking-widest uppercase">
            Enquire
          </Link>
        </nav>
      </div>
    </header>
  );
}
