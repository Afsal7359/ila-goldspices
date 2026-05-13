import Link from "next/link";
import { Flourish } from "@/components/Ornaments";

export default function NotFound() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-hero-gradient grain">
      <div className="absolute inset-0 pattern-arabesque opacity-40 pointer-events-none" />
      <div className="relative text-center px-6">
        <Flourish className="w-40 h-8 text-gold-500 mx-auto mb-8" />
        <div className="font-display text-9xl lg:text-[14rem] text-gold-700/30 leading-none mb-4">
          404
        </div>
        <h1 className="font-display text-4xl lg:text-6xl text-forest-700 leading-tight mb-6">
          This page got lost in the
          <br />
          <span className="italic text-gold-700">spice route.</span>
        </h1>
        <p className="text-lg text-forest-700/70 mb-8 max-w-lg mx-auto">
          The page you're looking for isn't here — but our cardamom pods are
          exactly where we left them.
        </p>
        <Link href="/" className="btn-primary">
          Back to home
        </Link>
      </div>
    </section>
  );
}
